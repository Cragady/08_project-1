$(document).ready(function(){
//  firebase init
  // var config = {
	// 	apiKey: "AIzaSyBjkyJLLxN0kKzEtH2i7BWE2nkwAn-AgYI",
	// 	authDomain: "train-database-a27c5.firebaseapp.com",
	// 	databaseURL: "https://train-database-a27c5.firebaseio.com",
	// 	projectId: "train-database-a27c5",
	// 	storageBucket: "",
	// 	messagingSenderId: "841147012687"
	// };
	// firebase.initializeApp(config);

  // var database = firebase.database()
  
  $("#addBarcode").on("click", function(event){
		event.preventDefault();
    
    var barcodeData = $("#barcodeInput").val();
    var queryURL = "https://cors.io/?https://api.upcdatabase.org/product/" +
      barcodeData + "/5E26D41FEF3483B1C6EC1DCC22B153C7";

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
  // var ScanditSDK = require("scandit-sdk");

  // ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
  //     playSoundOnScan: true,
  //     vibrateOnScan: true
  //   }).then(function(barcodePicker) {
  //     // barcodePicker is ready here to be used (rest of the tutorial code should go here)
  //   });

  //   var scanSettings = new ScanditSDK.ScanSettings({
  //     enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
  //     codeDuplicateFilter: 1000
  //   });
  //   barcodePicker.applyScanSettings(scanSettings);

  //   barcodePicker.onScan(function(scanResult) {
  //     alert(scanResult.barcodes.reduce(function(string, barcode) {
  //       return string + ScanditSDK.Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "\n";
  //     }, ""));
  //   });

  // ScanditSDK.configure(licenseKey: string, {
  //     engineLocation: string = "/",
  //     preloadEngineLibrary: boolean = false,
  //     preloadCameras: boolean = false
  //   })

});