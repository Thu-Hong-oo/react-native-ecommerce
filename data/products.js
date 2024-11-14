// Import the Firebase SDK and initialize Firebase
const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

const firebaseConfig = {
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
const collectionRef = db.collection("Product");

// Define the data for the documents
const dataArray = [
  {
    category: "Electronics",
    color: ["black", "white", "blue"],
    description: "Latest iPhone with advanced features.",
    mainImage:
      "https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2023_9_20_638307980220145280_iphone-15-promax-den-1.jpg",
    name: "iPhone 16",
    price: 800,
    quantity: 50,
    subImages: [
      "https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2023_9_20_638307982103040290_iphone-15-promax-trang-1.jpg",
      "https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2023_9_20_638307989548944936_iphone-15-promax-xanh-1.jpg",
    ],
    type: "Smartphone",
  },
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
