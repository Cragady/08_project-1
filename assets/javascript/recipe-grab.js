// var config = {
//     apiKey: "AIzaSyDBvYQ7mCwkZnL6eMdy9kqQ-wSB9aySqMw",
//     authDomain: "chef-in-your-pantry.firebaseapp.com",
//     databaseURL: "https://chef-in-your-pantry.firebaseio.com",
//     projectId: "chef-in-your-pantry",
//     storageBucket: "chef-in-your-pantry.appspot.com",
//     messagingSenderId: "982672855907"
// };
// firebase.initializeApp(config);
// var database = firebase.database();

// var recipe;
// var bars;
// var pullSwitch = false;
// var tempArray = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"]; //delete t1-t8 to make array empty after un commenting ajaxCallerBar()
// var foodsArray = [];
// var pantsArray;
// var searchParamArray = [];
// var sameValCheck = false;
// var itemResetArray;
// var ingredientResetter = false;


// /*sets the values required for the ajax calls
// then calls pageStarter() to activate button functionality*/
// database.ref().on('value', function (snapshot) {
//     recipe = snapshot.val().recipe;
//     bars = snapshot.val().bars;
//     pullSwitch = true;
//     pageStarter();
// });

// function ajaxCallerRec() {
//     $.ajax({
//         url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&instructionsRequired=false&intolerances=egg%2C+gluten&limitLicense=false&number=10&offset=0&query=olives%20C&type=main+course",
//         method: "GET",

//         headers: {
//             "X-Mashape-Key": recipe,
//             "accept": "application/json"
//         }
//     }).then(function (response) {
//         console.log(response);
//     });
// };
// alert("asdf");