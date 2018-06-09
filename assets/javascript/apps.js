$(document).ready(function(){

  
  $("#addBarcode").on("click", function(event){
		event.preventDefault();
    
    var barcodeData = $("#barcodeInput").val();
    var queryURL = "https://cors.io/?https://api.upcdatabase.org/product/" +
      barcodeData + Stuff;

      console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"

    }).then(function(response) {
      console.log(response);
      var obj = JSON.parse(response);
      console.log(obj);
      var barcodeData =$("<td>");
      barcodeData = obj.title;
      console.log(barcodeData);
    });

    // var splitted = sentence.split(/\s+/);
    // function longestWord(str) {
    //   return str.split(/\s+/).sort(function(w1, w2) {return w2.length - w1.length;})[0];    
  // }
  
  // var phrase = "dmitriy nesterkin drd";
  // console.log(longestWord(phrase));
  });
 

});