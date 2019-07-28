
let firebase = require('firebase')
//https://firebase.google.com/docs/web/setup#config-web-app

  // Your web app's Firebase configuration
  firebase.initializeApp ( {
    apiKey: "AIzaSyBoSK2pTwMQQp3Q3fupbU_Bz2WHBjIWd6Y",
    authDomain: "pinterest-coderhouse.firebaseapp.com",
    databaseURL: "https://pinterest-coderhouse.firebaseio.com",
    projectId: "pinterest-coderhouse",
    storageBucket: "",
    messagingSenderId: "41714942379",
    appId: "1:41714942379:web:9e6efb380cfdb2e9"
  });
  // Initialize Firebase

  export default firebase;
