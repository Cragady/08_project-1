var config = {
    apiKey: "AIzaSyDBvYQ7mCwkZnL6eMdy9kqQ-wSB9aySqMw",
    authDomain: "chef-in-your-pantry.firebaseapp.com",
    databaseURL: "https://chef-in-your-pantry.firebaseio.com",
    projectId: "chef-in-your-pantry",
    storageBucket: "chef-in-your-pantry.appspot.com",
    messagingSenderId: "982672855907"
};
firebase.initializeApp(config);
var database = firebase.database();

var recipe;
var bars;
var tempArray = []; //delete t1-t8 to make array empty after un commenting ajaxCallerBar()
var foodsArray = [];
var pantsArray;
var searchParamArray = [];
var sameValCheck = false;
var itemResetArray;
var ingredientResetter = false;
var ingredientDeleter = false;
var splicedDiced = -1;
var manuScanu;
var executedSearch;

/*sets the values required for the ajax calls
then calls pageStarter() to activate button functionality*/
database.ref().on('value', function (snapshot) {
    recipe = snapshot.val().recipe;
    bars = snapshot.val().bars;
    bars2 = snapshot.val().bars2;
    pageStarter();
});

function ajaxCallerRec(rName) {
    $.ajax({
        url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=" + rName,
        // url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=noodles%2Ctomatoes",
        method: "GET",

        headers: {
            "X-Mashape-Key": recipe,
            "accept": "application/json"
        }
    }).then(function (response) {
        console.log(response);
        var mainCards = $("#main-recipe-container");

        var recipeCard = $("<div>");

        var recipeText = $("<div>");
        recipeText.attr("id", "recipe-text");
        recipeCard.attr("id", "recipe-card");
        var recipeAddress = $("<div>");
        recipeAddress.attr("id", "recipe-address");
        // recipeCard.text(response.recipes[0].title);
        var title = response.recipes[0].title;
        var recipeImg = $("<img>");
        var servings = response.recipes[0].servings;
        recipeImg.attr("src", response.recipes[0].image);
        var time = response.recipes[0].readyInMinutes;
        var address = response.recipes[0].spoonacularSourceUrl;
        mainCards.append(recipeCard);
        recipeCard.append(recipeImg);
        recipeCard.append(recipeText);
        recipeText.append("<span> <strong>Title:</strong> " + title + "</span>");
        recipeText.append("<span> <strong>Total Time:</strong> " + time + "</span>");
        recipeText.append("<span><strong> number of servings:</strong> " + servings);
        recipeText.append("<div" + " class=" + '"' + "link-box" + '"' + "><strong>link:</strong> <a href=" + '"' + address + '"' + ">" + address + "</a></div>");


    });
}
function showRecipe() {
    $("#pants-array-set").click(function () {
        executedSearch = searchParamArray.join("");
        ajaxCallerRec(executedSearch);
        $("#main-recipe-container").addClass("border-me animated bounceInUp");
    });
};

function ajaxCallerBar(newItemScan) {
    $.ajax({
        url: "https://cors.io/?https://api.upcdatabase.org/product/" + newItemScan + "/" + bars,
        method: "GET",

    }).then(function (response) {
        var obj = JSON.parse(response);
        tempArray = string_to_array(obj.title);
        buttonSetterFunk();
    });
}

/*takes response from ajaxCallerBar() and makes it 
readable to browser*/
string_to_array = function (str) {
    return str.trim().split(" ");
};

buttonSetterFunk = function () {

    for (i = 0; i < tempArray.length; i++) {
        newBtn = $("<button>");
        btnInfo = tempArray[i];
        newBtn.text(btnInfo);
        newBtn.css("background", "#c7cfdb");
        newBtn.attr({
            "data-word": tempArray[i],
            "data-selected": "no",
            "data-modal": "yes",
            "class": "btn m-1 cray-selector"
        });
        $("#pantry-items-show").append(newBtn);
    }
};

btnGrabber = function () {

    $("body").on({
        mouseenter: function () {
            $(this).css("opacity", "0.75");
        },
        mouseleave: function () {
            $(this).css("opacity", "1");
        },
        click: function () {
            titleGrabber = $(this).attr("data-word");
            statusGrabber = $(this).attr("data-selected");
            pantryGrabber = $(this).attr("data-pantry")
            if ((statusGrabber !== undefined) && (ingredientResetter === false) && (ingredientDeleter === false)) {
                if (statusGrabber === "no") {
                    $(this).attr("data-selected", "yes");
                    $(this).css("background", "#86d6d6");
                    if (pantryGrabber !== undefined) {
                        searchParamArray.push(pantryGrabber);
                        console.log(searchParamArray);
                    }
                    if (titleGrabber !== undefined) {
                        if (!foodsArray.includes(titleGrabber)) {
                            foodsArray.push(titleGrabber);
                            console.log(foodsArray);
                        }
                    }

                }
                if (statusGrabber === "yes") {
                    $(this).attr("data-selected", "no");
                    $(this).css("background", "#c7cfdb")
                    if (pantryGrabber !== undefined) {
                        searchParamArray.splice($.inArray(pantryGrabber, searchParamArray), 1);
                        console.log("this this" + pantryGrabber);
                        console.log(searchParamArray);
                    }
                    if (titleGrabber !== undefined) {
                        foodsArray.splice($.inArray(titleGrabber, foodsArray), 1);
                        console.log(foodsArray);
                    }
                }
            };
            if ((ingredientResetter === true) || (ingredientDeleter === true)) {
                modalChecker = $(this).attr("data-modal");
                console.log(modalChecker);
                if (modalChecker === "no") {
                    oldDataGrabber = $(this).text();

                    oldDataLayer(oldDataGrabber, splicedDiced);
                };
            };
        }
    }, "button.cray-selector");
}

function hasValue(arrPusher) {
    for (var i = 0; i < pantsArray.length; i++) {
        for (let value of Object.values(pantsArray[i])) {
            if ((value === arrPusher) && (ingredientResetter === false) && (ingredientDeleter === false)) {
                sameValCheck = false;
            } else if ((ingredientResetter === true) || (ingredientDeleter === true)) {
                if (value === arrPusher) {
                    tempArray = pantsArray[i].oldData.tempArray;
                    ingredientResetter = false;
                    ingredientDeleter = false;
                    splicedDiced = i;
                    console.log("splicer set at: " + splicedDiced);
                };
            };
        }
    }
}

pantsSet = function () {
    $("#pants-array-btn").click(function () {
        pushToPantry();
        $("#my-modal").modal("toggle");
    });
};

// $("#pants-array-set").click(function(){

// });

pushToPantry = function () {
    arrItem = "";
    arrItemShow = "";
    sameValCheck = true;
    if (foodsArray.length > 0) {
        for (i = 0; i < foodsArray.length; i++) {
            arrItem += foodsArray[i] + "%20C";
            arrItemShow += foodsArray[i] + " ";
            orderPants = { arrItemShow: arrItemShow, arrItem, oldData: { tempArray } };
        }
        console.log(orderPants);
    } else if (foodsArray.length === 0) {
        return;
    };
    hasValue(arrItemShow);
    if (sameValCheck === true) {
        pantsArray.push(orderPants);
        newPantsItem = $("<button>");
        newPantsItem.text(arrItemShow);
        newPantsItem.attr({
            "data-pantry": arrItem,
            "data-modal": "no",
            "data-resetting": "no",
            "data-deleting": "no",
            "class": "card p-1 m-1 cray-selector second-cray",
            "data-selected": "no"
        });
        newPantsItem.css("background", "#c7cfdb");
        $("#pantry-items").append(newPantsItem);
        itemResetArray = foodsArray;
        arrItem = "";
        arrItemShow = "";
        $("div#pantry-items-show").empty();
        foodsArray = [];
        tempArray = [];
    }
};

resetPantryItems = function () {
    $("button#reset-pants-item").click(function () {
        thisButtonGrab = $("button#reset-pants-item");
        resetSelector = $("button.cray-selector.second-cray");
        resetStatus = thisButtonGrab.attr("data-resetting");
        deleteCheck = resetSelector.attr("data-deleting");
        if (deleteCheck === "no") {
            if (resetStatus === "no") {
                thisButtonGrab.attr("data-resetting", "yes");
                thisButtonGrab.attr("data-deleting", "no");
                resetSelector.css("background", "#f28aca");
                resetSelector.attr("data-selected", "no");
                searchParamArray = [];
                ingredientResetter = true;
                ingredientDeleter = false;
            };
        };

        if (resetStatus === "yes") {
            thisButtonGrab.attr("data-resetting", "no");
            thisButtonGrab.attr("data-deleting", "no");
            resetSelector.css("background", "#c7cfdb");
            resetSelector.attr("data-selected", "no");
            ingredientResetter = false;
            ingredientDeleter = false;
        };

    });
};

deletePantryItems = function () {
    $("button#delete-pants-item").click(function () {
        thisButtonGrab = $("button#delete-pants-item");
        resetSelector = $("button.cray-selector.second-cray");
        resetStatus = thisButtonGrab.attr("data-deleting");
        resetCheck = resetSelector.attr("data-resetting");
        if (resetCheck === "no") {
            if (resetStatus === "no") {
                thisButtonGrab.attr("data-deleting", "yes");
                thisButtonGrab.attr("data-resetting", "no");
                resetSelector.css("background", "#dd0837");
                resetSelector.attr("data-selected", "no");
                searchParamArray = [];
                ingredientDeleter = true;
                ingredientResetter = false;
            };
        };

        if (resetStatus === "yes") {
            thisButtonGrab.attr("data-deleting", "no");
            thisButtonGrab.attr("data-resetting", "no");
            resetSelector.css("background", "#c7cfdb");
            resetSelector.attr("data-selected", "no");
            ingredientDeleter = false;
            ingredientResetter = false;
        };

    });
};

typedItemEntry = function () {
    $("button#quick-item-entry").click(function (event) {
        event.preventDefault();
        typedPantryItem = $("#input-password-2").val().trim();
        typedPantryItem = string_to_array(typedPantryItem);
        tempArray = typedPantryItem;
        for (i = 0; i < typedPantryItem.length; i++) {
            foodsArray.push(typedPantryItem[i]);
        }
        $("#input-password-2").val("");
        pushToPantry();
    });
};

oldDataLayer = function (oldSelector, arrObjSplicer) {
    oldBtnSelector2 = $("button:contains(" + oldSelector + ")");
    oldBtnSelector2.remove();
    if (ingredientResetter === true) {
        hasValue(oldSelector);
        buttonSetterFunk();
        $("#my-modal").modal("toggle");
    } else {
        hasValue(oldSelector);
    };
    if (splicedDiced !== -1) {
        pantsArray.splice(splicedDiced, 1);
    }
    $("button.cray-selector").css("background", "#c7cfdb");

};

previousIngredientsLister = function () {
    if (pantsArray !== undefined) {
        for (i = 0; i < pantsArray.length; i++) {
            oldPantsItem = $("<button>");
            oldPantsItem.text(pantsArray[i].arrItemShow);
            oldPantsItem.attr({
                "data-pantry": pantsArray[i].arrItem,
                "class": "card p-1 m-1 cray-selector",
                "data-selected": "no",
                "data-old": pantsArray[i].oldData
            });
            oldPantsItem.css("background", "#c7cfdb");
            $("#pantry-items").append(oldPantsItem);
        }
    } else {
        pantsArray = [];
    };
};

scanButtonInput = function () {
    $("#pills-home-tab-btn").click(function () {
        $("#my-modal").modal("toggle");
    });
};

scannerAutoInput = function () {
    $("#auto-scanner-input").on("keydown", function (e) {
        if (e.keyCode === 13) {
            manuScanu = $("#auto-scanner-input").val();
            $("#auto-scanner-input").val("");
            $("#my-modal").modal("toggle");
            ajaxCallerBar(manuScanu);
        };
    });
};

pageStarter = function () {
    previousIngredientsLister();
    resetPantryItems();
    deletePantryItems();
    btnGrabber();
    //ajaxCallerBar(); //disregard the comment below this, we'll tie this to a button
    buttonSetterFunk(); //delete this after uncommenting ajaxCallerBar()
    typedItemEntry();
    pantsSet();
    scanButtonInput();
    scannerAutoInput();
    showRecipe();
    // ajaxCallerRec();
}





//%20C for spaces 
//add delete entire item in modal
/*add update for resetting in modal
  so that user has to finish restting before adding
  another item*/
//*add button for cancelation of resetting or deleting
