// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import favoriteReducer from "./slices/favoriteSlice";
// Tạo store và thêm userSlice vào
const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
  },
});

export default store;
