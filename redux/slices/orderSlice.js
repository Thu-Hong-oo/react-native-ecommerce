// redux/slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    selectedItems: [], // Danh sách các sản phẩm đã chọn cho đơn hàng
    totalPrice: 0, // Tổng giá trị đơn hàng
    voucher: null, // Giá trị giảm giá
    finalPrice: 0, // Giá trị cuối cùng sau khi giảm giá
    paymentMethod:null,
  },
  reducers: {
    setSelectedItems(state, action) {
      state.selectedItems = action.payload; // Lưu danh sách sản phẩm đã chọn
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload; // Cập nhật totalPrice
    },
    setVoucher(state, action) {
      state.voucher = action.payload;
    },
    setFinalPrice(state, action) {
      state.finalPrice = action.payload; // Cập nhật finalPrice
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload; // Cập nhật finalPrice
    },
  },
});

// Xuất các action để sử dụng trong các component
export const { setSelectedItems, setTotalPrice, setVoucher, setFinalPrice, setPaymentMethod } = orderSlice.actions;

// Xuất reducer để sử dụng trong store
export default orderSlice.reducer;