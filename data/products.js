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

// Get a reference to the "Product" collection
const collectionRef = db.collection("Products");

const addManualProduct = () => {
  const product = {
    name: "ZTE Nubia V60 Design 6GB 256GB",
    description: "The ZTE Nubia V60 Design is the perfect choice for users looking for a powerful smartphone with an exquisite design and outstanding performance but at an extremely affordable price.",
    price: 150,
    quantity: 100,
    category: "Electronics",
    type: "Smartphone",
    rating: "5",
    mainImage:
      "https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/zte_nubia_v60_den_3_43ecfc9a7e.jpg",
    subImages: [
      {
        name: "Green",
        img: "https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/zte_nubia_v60_den_3_43ecfc9a7e.jpg",
      },
      {
        name: "Yellow",
        img: "https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/zte_nubia_v60_vang_3_7a77e0762b.jpg",
      },
      {
        name: "Purple",
        img: "https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/zte_nubia_v60_tim_2_b27f760051.jpg",
      },
    ],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Thêm timestamp
  };

  const docRef = collectionRef.doc("ES000004"); // Tạo document với ID
  docRef
    .set(product)
    .then(() => {
      console.log("Sản phẩm đã được thêm vào Firestore");
    })
    .catch((error) => {
      console.error("Lỗi khi thêm sản phẩm: ", error);
    });
};

// Gọi hàm để thêm sản phẩm thủ công
addManualProduct();
