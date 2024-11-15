// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";

// Tạo store và thêm userSlice vào
const store = configureStore({
  reducer: {
    user: userReducer, // Thêm reducer của userSlice vào store
    product: productReducer,
  },
});

export default store;
