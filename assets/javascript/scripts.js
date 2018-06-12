// Helper function called when the "Continue Scanning" button is clicked
function continueScanning() {
    if (picker) {
        continueButton.disabled = true;
        // Resume scanning
        picker.resumeScanning();
    }
        }
        // Configure the library and activate it with a license key
        const licenseKey = bars2;
        // const engineLocation = "build"; // the folder containing the engine
        // or, if using a CDN,
        const engineLocation = "https://unpkg.com/scandit-sdk/build"
        ScanditSDK.configure(licenseKey, { engineLocation: engineLocation });
        const scannerContainer = document.getElementById("scandit-barcode-picker");
        const resultContainer = document.getElementById("scandit-barcode-result");
        const continueButton = document.getElementById("continue-scanning-button");
        continueButton.disabled = true;
        continueButton.hidden = true;
        let picker;
        // Create & start the picker
        ScanditSDK.BarcodePicker.create(scannerContainer, {
                playSoundOnScan: true,
                vibrateOnScan: true
            })
            .then(barcodePicker => {
                picker = barcodePicker;
                // Create the settings object to be applied to the scanner
                const scanSettings = new ScanditSDK.ScanSettings({
                    enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93",
                        "itf"
                    ],
                    codeDuplicateFilter: 1000
                });
                picker.applyScanSettings(scanSettings);
                // If a barcode is scanned, show it to the user and pause scanning
                // (scanning is resumed when the user clicks "Continue Scanning")
                picker.onScan(scanResult => {
                    continueButton.hidden = false;
                    continueButton.disabled = false;
                    picker.pauseScanning();
                    resultContainer.innerHTML = scanResult.barcodes.reduce((string, barcode) =>
                        string +
                        `${ScanditSDK.Barcode.Symbology.toHumanizedName(barcode.symbology)}: ${barcode.data}<br>`,
                        '');
                });
                picker.onScanError(error => {
                    alert(error.message);
                });
                picker.resumeScanning();
            })
            .catch(error => {
                alert(error);
            });