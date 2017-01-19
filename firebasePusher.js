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
    apiKey: "____",
    authDomain: "___",
    databaseURL: "___",
    storageBucket: "____",
    messagingSenderId: "____"
};
firebase.initializeApp(config);
firebase.auth().signInWithEmailAndPassword("_____", "_____").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

ipcon.connect(HOST, PORT,
    function(error) {
        console.log('Tinkerforge connection Error: ' + error);
    }
); // Connect to brickd
// Don't use device before ipcon is connected

var c = 0;
var SENSOR_COUNT = 2;
var exit = function(flag) {
    if (flag == 0) {
        c++;
        console.log("counter incremented");

        if (c == SENSOR_COUNT) {
            console.log("exit normally");
            process.exit(0);
        }
    } else {
        console.log("quit...");
        process.exit(flag);
    }

}

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function(connectReason) {
        // Get current humidity (unit is %RH/10)
        h.getHumidity(
            function(humidity) {
                console.log('Humidity: ' + Date.now() + " " + humidity / 10.0 + ' %RH');
                humi = humidity / 10.0;
                firebase.database().ref("plants/01010101/humidity" + Date.now()).set(humi);
                exit(0);
            },
            function(error) {
                console.log('Sensor Error: ' + error);
                exit(1);
            }
        );
        m.getMoistureValue(function(moisture) {
            console.log('Moisture_' + Date.now() + " " + moisture);
            firebase.database().ref("Moisture_" + Date.now()).set(moisture);
            exit(0);
        }, function(error) {
            console.log('Moisture-Sensor Error: ' + error);
            exit(1);
        });
    }
);
