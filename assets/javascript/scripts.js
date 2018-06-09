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
var pullSwitch = false;
var tempArray = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"]; //delete t1-t8 to make array empty after un commenting ajaxCallerBar()
var foodsArray = [];
var pantsArray;
var searchParamArray = [];
var sameValCheck = false;
var itemResetArray;
var ingredientResetter = false;


/*sets the values required for the ajax calls
then calls pageStarter() to activate button functionality*/
database.ref().on('value', function (snapshot) {
    recipe = snapshot.val().recipe;
    bars = snapshot.val().bars;
    pullSwitch = true;
    pageStarter();
});

function ajaxCallerRec() {
    $.ajax({
        url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=noodles%2Ctomatoes",
        method: "GET",

        headers: {
            "X-Mashape-Key": recipe,
            "accept": "application/json"
        }
    }).then(function (response) {
        console.log(response);
        var recipeCard = $("#recipe-card");
        var recipeText = $("<div>");
        recipeText.attr("id", "recipe-text");
        var recipeAddress = $("<div>");
        recipeAddress.attr("id", "#recipe-address");
        // recipeCard.text(response.recipes[0].title);
        var title = response.recipes[0].title;
        var recipeImg = $("<img>");
        recipeImg.attr("src", response.recipes[0].image);
        var time = response.recipes[0].readyInMinutes;
        var address = response.recipes[0].spoonacularSourceUrl;

        recipeCard.append(recipeImg);
        recipeCard.append(recipeText);
        recipeText.append(title);
        recipeText.append(time);
        recipeText.append(address);


    });
}
function addRecipe() {
    $("button#pants-array-set").click(function () {

        ajaxCallerRec();

    })


}
function ajaxCallerBar() {
    $.ajax({
        url: "https://cors.io/?https://api.upcdatabase.org/product/072999493033/" + bars,
        method: "GET",

    }).then(function (response) {
        var obj = JSON.parse(response);
        var barcodeData = $("<button>")

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
            if (statusGrabber !== undefined) {
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
            if (ingredientResetter === true) {
                oldDataGrabber = $(this).text();
                oldDataLayer(oldDataGrabber);
            }
        }
    }, "button.cray-selector");
}

function hasValue(arrPusher) {
    for (i = 0; i < pantsArray.length; i++) {
        for (let value of Object.values(pantsArray[i])) {
            if ((value === arrPusher) && (ingredientResetter === false)) {
                sameValCheck = false;
            } else if (ingredientResetter === true) {
                if (value === arrPusher) {
                    tempArray = pantsArray[i].oldData.tempArray;
                    ingredientResetter = false;
                    oldSelector = i;
                };
            };
        }
    }
}

pantsSet = function () {
    $("#pants-array-btn").click(function () {
        pushToPantry();
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
        $("button.cray-selector.second-cray").css("background", "#f28aca");
        ingredientResetter = true;
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

// objectSifterSplicer = function(objInArr){
//     for()
//     pantsArray.splice($.inArray(indexPoint, pantsArray),1);
// };

oldDataLayer = function (oldSelector) {
    oldBtnSelector2 = $("button:contains(" + oldSelector + ")");
    oldBtnSelector2.remove();
    hasValue(oldSelector);
    console.log(oldSelector);
    pantsArray.splice(oldSelector, 1);
    $("button.cray-selector.second-cray").css("background", "#f28aca");
    buttonSetterFunk();
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

pageStarter = function () {
    previousIngredientsLister();
    resetPantryItems();
    btnGrabber();
    //ajaxCallerBar(); //disregard the comment below this, we'll tie this to a button
    buttonSetterFunk(); //delete this after uncommenting ajaxCallerBar()
    typedItemEntry();
    pantsSet();
    addRecipe();
}





//%20C for spaces 
//do concatenation for foodsArray from pantsArray
//block item from being added to searchparamarray if ingredients resetter ===true