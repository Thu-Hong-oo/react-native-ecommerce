// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

// Tạo store và thêm userSlice vào
const store = configureStore({
  reducer: {
    user: userReducer, // Thêm reducer của userSlice vào store
  },
});

export default store;
