// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Trạng thái ban đầu
const initialState = {
  user: null, // Nếu chưa có người dùng, sẽ là null
  status: "idle",
};

// Slice cho người dùng
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Cập nhật người dùng
    },
    logout: (state) => {
      state.user = null; // Xóa thông tin người dùng
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
