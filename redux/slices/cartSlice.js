import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCartItemsFromService,
  addToCartInService,
  removeFromCartInService,
  updateCartItemQuantityInService,
} from "../../services/cartServices";

// Fetch Cart Items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchCartItemsFromService(userId);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Add Item to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, item }, { rejectWithValue }) => {
    try {
      return await addToCartInService(userId, item);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Remove Item from Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      await removeFromCartInService(userId, itemId);
      return itemId;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Update Item Quantity
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ userId, itemId, quantity }, { rejectWithValue }) => {
    try {
      return await updateCartItemQuantityInService(userId, itemId, quantity);
    } catch (error) {
      return rejectWithValue(error.message); // Trả lỗi rõ ràng để hiển thị
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    totalPrice: 0,
  },
  reducers: {
    calculateTotalPrice(state) {
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Item to Cart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Remove Item from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Item Quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { itemId, quantity } = action.payload; // Lấy itemId và quantity từ payload
        const item = state.items.find((item) => item.id === itemId);
        if (item) {
          item.quantity = quantity; // Cập nhật số lượng
        }
      })

      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { calculateTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;
