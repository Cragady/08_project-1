var string = '+A123BJC5D6E71G';
var options = null;
try {
    var result = ScanditParser.parseString(
        ScanditParser.Type.HIBC,
        string,
        options
        );
} catch (e) {
    // Something went wrong
}

// We can directly access the json object ...
console.log(result.json);
// .. or we can acces individual fields by name
var field = result.getFieldByName("metadata");
console.log(field.parsed);
console.log(field.rawString);