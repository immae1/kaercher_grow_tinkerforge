var firebase = require('firebase');
var Tinkerforge = require('tinkerforge');

var HOST = 'localhost';
var PORT = 4223;
var UID = 'xEi'; // Change XYZ to the UID of your Humidity Bricklet
var UIDM = 'zUE';
var humi;
var ipcon = new Tinkerforge.IPConnection(); // Create IP connection
var h = new Tinkerforge.BrickletHumidity(UID, ipcon); // Create device object
var m = new Tinkerforge.BrickletMoisture(UIDM, ipcon); // Create moisu object
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

ipcon.connect(HOST, PORT,
    function (error) {
        console.log('Tinkerforge connection Error: ' + error);
    }
); // Connect to brickd
// Don't use device before ipcon is connected

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function (connectReason) {
        // Get current humidity (unit is %RH/10)
        h.getHumidity(
            function (humidity) {
                console.log('Humidity: '+Date.now()+" " + humidity/10.0 + ' %RH');
                 humi=humidity/10.0;

                firebase.database().ref("Humidity_"+Date.now()).set(humi);
                       ipcon.disconnect();
        process.exit(0);

        },
            function (error) {
                console.log('Sensor Error: ' + error);
            }
        );
    }
);

