var firebase = require('firebase');
// Set the configuration for your app
    var config = {
        apiKey: "AIzaSyDYJgJcUTH6Ugsi1TGP4xA4Tprk68M2e94",
        authDomain: "kaerchergrow.firebaseapp.com",
        databaseURL: "https://kaerchergrow.firebaseio.com",
        storageBucket: "https://kaerchergrow.appspot.com",
        messagingSenderId: "900125974783"
    };
firebase.initializeApp(config);
firebase.auth().signInWithEmailAndPassword("hans23@weed.de", "iamtheboy").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

// Create a root reference
setTimeout(function(){
var storage = firebase.database();
var storageRef = firebase.storage();
// File or Blob named mountains.jpg
var file = {"name":"1478384609.jpg"};
console.log(file.name);
// Create the file metadata

var uploadTask = storageRef.child('images/'+file.name).put(file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
    console.log("test")
}, function(error) {
    console.error("Something nasty happened", error);
}, function() {
  var downloadURL = uploadTask.snapshot.downloadURL;
  console.log("Done. Enjoy.", downloadURL);
});

},2000
);
