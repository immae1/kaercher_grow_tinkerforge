var Tinkerforge = require('tinkerforge');
var firebase = require('firebase');



var HOST = 'localhost';
var PORT = 4223;
var UID = 'uqU'; // Change XYZ to the UID of your NFC/RFID Bricklet
var id;

var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyDYJgJcUTH6Ugsi1TGP4xA4Tprk68M2e94",
    authDomain: "kaerchergrow.firebaseapp.com",
    databaseURL: "https://kaerchergrow.firebaseio.com",
    storageBucket: "kaerchergrow.appspot.com",
    messagingSenderId: "900125974783"
  };
  firebase.initializeApp(config);
firebase.auth().signInWithEmailAndPassword("hans23@weed.de", "iamtheboy").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

var ipcon = new Tinkerforge.IPConnection(); // Create IP connection
var nr = new Tinkerforge.BrickletNFCRFID(UID, ipcon); // Create device object

var UID2 = 'sB2'; // Change XYZ to the UID of your Piezo Speaker Bricklet
var ipcon2 = new Tinkerforge.IPConnection(); // Create IP connection
var ps = new Tinkerforge.BrickletPiezoSpeaker(UID2, ipcon2); // Create device object

ipcon2.connect(HOST, PORT,
    function (error) {
        console.log('Error: ' + error);
    }
); // Connect to brickd
// Don't use device before ipcon is connected

ipcon2.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function (connectReason) {
      console.log("speaker_connected");
        // Make 2 second beep with a frequency of 1kHz

    }
);

ipcon.connect(HOST, PORT,
    function (error) {
        console.log('Error: ' + error);
    }
); // Connect to brickd
// Don't use device before ipcon is connected

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function (connectReason) {
        // Select NFC Forum Type 2 tag
        nr.requestTagID(Tinkerforge.BrickletNFCRFID.TAG_TYPE_TYPE2);
    }
);

// Register state changed callback
nr.on(Tinkerforge.BrickletNFCRFID.CALLBACK_STATE_CHANGED,

    // Callback function for state changed callback
    function (state, idle) {

      console.log(state);

        if(state == Tinkerforge.BrickletNFCRFID.STATE_REQUEST_TAG_ID_READY) {
            nr.requestPage(5);
            console.log('Requesting data...');
        } else if(state == Tinkerforge.BrickletNFCRFID.STATE_REQUEST_PAGE_READY) {
            // Get and print pages
            nr.getPage(
                function (data) {
			var s = data[0];
                    for(var i = 0; i < data.length; i++) {
                        s +=  data[i].toString();
                    }

                    if(id==undefined||id!=s){
                      ps.morseCode("- -", 1500);
                      firebase.database().ref("latest").set(s);
                      id = s;
                      console.log(s);
                    var fs = require('fs');
                      fs.writeFile("/home/pi/tinkerforgecrap/latest.json", s, function(err) {
                       if(err) {
                          return console.log("fail write file" + err);
                          } 
                          console.log("The file was saved!");
                          }); 
			}

                    nr.requestTagID(Tinkerforge.BrickletNFCRFID.TAG_TYPE_TYPE2);
                }
            );
        } else if((state & (1 << 6)) == (1 << 6)) {
            // All errors have bit 6 set
            console.log('Error: ' + state);
            nr.requestTagID(Tinkerforge.BrickletNFCRFID.TAG_TYPE_TYPE2);        }
    }
);

console.log('Press key to exit');
process.stdin.on('data',
    function (data) {
        ipcon.disconnect();
        process.exit(0);
    }
);

