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
    name: "Simpson Local Brand Streetwear Oversize Sports T-Shirt - TS10",
    description:
      "SIMPSON ® Sportswear T-Shirt Material: Premium Cotton 100%. Size: M / L / XL. Anti-crack embossed silk screen printing, high adhesion",
    price: 10,
    quantity: 100,
    category: "Clothes",
    type: "T-shirt",
    rating: "4.8",
    mainImage:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxtd9ts9d4nv6d.webp",
    subImages: [
      {
        name: "Black",
        img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxtd9ts9d4nv6d.webp",
      },
      {
        name: "Red",
        img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-loiihga4i1gz96.webp",
      },
      {
        name: "Gray",
        img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp4wevr8zg4b57.webp",
      },
      {
        name: "White",
        img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxtda508xy3dc6.webp",
      },
    ],
    sizes: ["M(<58kg)", "L(<73kg)", "XL<90kg"],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Thêm timestamp
  };

  const docRef = collectionRef.doc("CT000002"); // Tạo document với ID
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
