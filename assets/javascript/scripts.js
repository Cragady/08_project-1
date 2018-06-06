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

database.ref().once('value', function(snapshot){
    recipe = snapshot.val().recipe;
    bars = snapshot.val().bars;
    pullSwitch = true;
})/*.then(function(){ajaxCallerRec();})*/;

function ajaxCallerRec(){
    $.ajax({
        url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&instructionsRequired=false&intolerances=egg%2C+gluten&limitLicense=false&number=10&offset=0&query=olives&type=main+course",
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
        console.log(response);
    });
    
}

$("#click-me").click(function(){
    ajaxCallerRec();
});

$("#click-me2").click(function(){
    ajaxCallerBar();
})
