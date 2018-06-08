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
var tempArray = [];
var foodsArray = [];
var pantsArray = [];

database.ref().on('value', function(snapshot){
    recipe = snapshot.val().recipe;
    bars = snapshot.val().bars;
    pullSwitch = true;
    pageStarter();
    $('[data-toggle="tooltip"]').tooltip();
});

function ajaxCallerRec(){
    $.ajax({
        url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&instructionsRequired=false&intolerances=egg%2C+gluten&limitLicense=false&number=10&offset=0&query=olives%20C&type=main+course",
        method: "GET",

        headers:{
            "X-Mashape-Key": recipe,
            "accept": "application/json"
    }
    }).then(function(response){
        console.log(response);
    });
}

function ajaxCallerBar(){
    $.ajax({
        url: "https://cors.io/?https://api.upcdatabase.org/product/072999493033/" + bars,
        method: "GET",

    }).then(function(response){
        var obj = JSON.parse(response);
        var barcodeData = $("<button>")

        tempArray = string_to_array(obj.title);
        buttonSetterFunk();
        });   
}

string_to_array = function (str) {
    return str.trim().split(" ");
};

buttonSetterFunk = function(){
    
    for(i = 0; i < tempArray.length; i++){
        newBtn = $("<button>");
        btnInfo = tempArray[i];
        newBtn.text(btnInfo);
        newBtn.attr({
            "data-word": tempArray[i],
            "class": "cray-selector"
        });
        $("#pantry-items-show").append(newBtn);

    }
};

btnGrabber = function(){

    $("body").on("click", "button.cray-selector", function(){
        titleGrabber = $(this).attr("data-word");
        statusGrabber = $(this).attr("data-selected");
        if(titleGrabber !== undefined){
            if(!foodsArray.includes(titleGrabber)){
                foodsArray.push(titleGrabber);
            }
        };
        if(statusGrabber !== undefined){
            if(statusGrabber === "no"){
                $(this).attr("data-selected", "yes");
                
            }
        };
    });
}

pantsSet = function(){
    $("#pants-array-btn").click(function(){
        arrItem = "";
        arrItemShow = "";
        if(foodsArray.length > 1){
            for(i = 0; i < foodsArray.length; i++){
                arrItem += foodsArray[i] + "%20C";
                arrItemShow += foodsArray[i] + " ";
            }
        } else if (foodsArray.length === 1){
            arrItem = foodsArray[0];
            arrItemShow = foodsArray[0];
        } else if(foodsArray.length === 0){
            return;
        };
        console.log(arrItem);
        newPantsItem = $("<button>");
        newPantsItem.text(arrItemShow);
        newPantsItem.attr({
            "data-pantry": arrItem,
            "class": "card p-1 cray-selector",
            "data-selected": "no"
        });
        newPantsItem.css("background", "#c7cfdb");
        $("#pantry-items").append(newPantsItem);
        arrItem = "";
        arrItemShow = "";
    });
};

pageStarter = function(){
    btnGrabber();
    ajaxCallerBar();
    pantsSet();
}





//%20C for spaces 
//do concatenation for foodsArray from pantsArray