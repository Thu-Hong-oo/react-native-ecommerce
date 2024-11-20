// Import the Firebase SDK and initialize Firebase
const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyBiVD74lGlaAhmRNJ-OuIgXtYs3BwnppXk",
  authDomain: "subproject-96426.firebaseapp.com",
  projectId: "subproject-96426",
  storageBucket: "subproject-96426.firebasestorage.app",
  messagingSenderId: "124321505047",
  appId: "1:124321505047:web:d8a58c372030dd5c712152",
  measurementId: "G-PY3DWTZV97",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Get a reference to the collection
const collectionRef = db.collection("Voucher");

// Define the data for the documents
const dataArray = [
  {code:'nghihoc', quantity:3, discount:0.05},
    {code:'www', quantity:3, discount:0.15},
    {code:'nghihocwww', quantity:3, discount:0.25},
    {code:'nghihocreact', quantity:3, discount:0.5},
];

// Create a batch write operation
const batch = firebase.firestore().batch();

// Loop through the data array and add each document to the batch
dataArray.forEach((data) => {
  const docRef = collectionRef.doc(); // Create a new document reference with a unique ID
  batch.set(docRef, data); // Add the data to the batch for this document reference
});

// Commit the batch write operation
batch
  .commit()
  .then(() => {
    console.log("Batch write operation completed");
  })
  .catch((error) => {
    console.error("Batch write operation failed: ", error);
  });