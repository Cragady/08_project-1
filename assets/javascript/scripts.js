
Skip to content

Pull requests
Issues
Marketplace
Explore

@blaveder

0
0

0

Cragady /08_project - 1
Code
Issues 0
Pull requests 1
Projects 1
Wiki
Insights
08_project - 1 / assets / javascript / scripts.js
bd8f58f 11 hours ago
@Cragady Cragady cleaned a little
316 lines(281 sloc) 10.1 KB
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
var ingredientDeleter = false;
var splicedDiced = -1;


/*sets the values required for the ajax calls
then calls pageStarter() to activate button functionality*/
database.ref().on('value', function (snapshot) {
    recipe = snapshot.val().recipe;
    bars = snapshot.val().bars;
    bars2 = snapshot.val().bars2;
    pullSwitch = true;
    pageStarter();
});

function ajaxCallerRec() {
    $.ajax({
        url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&instructionsRequired=false&intolerances=egg%2C+gluten&limitLicense=false&number=10&offset=0&query=olives%20C&type=main+course",
        method: "GET",

        headers: {
            "X-Mashape-Key": recipe,
            "accept": "application/json"
        }
    }).then(function (response) {
    });
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
                oldDataGrabber = $(this).text();

                oldDataLayer(oldDataGrabber, splicedDiced);
            }
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
        if (resetStatus === "no") {
            thisButtonGrab.attr("data-resetting", "yes");
            resetSelector.css("background", "#f28aca");
            resetSelector.attr("data-selected", "no");
            searchParamArray = [];
            ingredientResetter = true;
        }
        if (resetStatus === "yes") {
            thisButtonGrab.attr("data-resetting", "no");
            resetSelector.css("background", "#c7cfdb");
            resetSelector.attr("data-selected", "no");
            ingredientResetter = false;
        };

    });
};

deletePantryItems = function () {
    $("button#delete-pants-item").click(function () {
        thisButtonGrab = $("button#delete-pants-item");
        resetSelector = $("button.cray-selector.second-cray");
        resetStatus = thisButtonGrab.attr("data-deleting");
        if (resetStatus === "no") {
            thisButtonGrab.attr("data-deleting", "yes");
            resetSelector.css("background", "#dd0837");
            resetSelector.attr("data-selected", "no");
            searchParamArray = [];
            ingredientDeleter = true;
        }
        if (resetStatus === "yes") {
            thisButtonGrab.attr("data-deleting", "no");
            resetSelector.css("background", "#c7cfdb");
            resetSelector.attr("data-selected", "no");
            ingredientDeleter = false;
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
}





//%20C for spaces 

© 2018 GitHub, Inc.
    Terms
Privacy
Security
Status
Help

Contact GitHub
API
Training
Shop
Blog
About

Press h to open a hovercard with more details.
