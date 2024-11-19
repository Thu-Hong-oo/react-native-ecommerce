// favoriteSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { app } from "../../config/firebaseConfig"; // Đường dẫn đến cấu hình Firebase

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
    addFavorite: (state, action) => {
      const itemExists = state.items.find((item) => item === action.payload);
      if (!itemExists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
  },
});

// Thêm hàm để lưu danh sách yêu thích vào tài liệu người dùng
export const saveFavoriteToFirestore =
  (userId, productId) => async (dispatch) => {
    const db = getFirestore(app);
    const userRef = doc(db, "Users", userId, "favorite"); // Tài liệu của người dùng

    try {
      await updateDoc(userRef, {
        favorites: arrayUnion(productId), // Thêm ID sản phẩm vào mảng favorites
      });
      dispatch(addFavorite(productId)); // Lưu ID sản phẩm vào Redux
    } catch (error) {
      console.error("Lỗi khi lưu yêu thích: ", error);
    }
  };

// Thêm hàm để lấy danh sách yêu thích từ tài liệu người dùng
export const fetchFavoritesFromFirestore = (userId) => async (dispatch) => {
  const db = getFirestore(app);
  const userRef = doc(db, "Users", userId); // Tài liệu của người dùng

  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const favorites = userDoc.data().favorites || []; // Lấy mảng favorites
      dispatch(setFavorites(favorites));
    } else {
      console.log("Tài liệu người dùng không tồn tại");
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu thích: ", error);
  }
};

// Thêm hàm để xóa yêu thích từ tài liệu người dùng
export const removeFavoriteFromFirestore =
  (userId, productId) => async (dispatch) => {
    const db = getFirestore(app);
    const userRef = doc(db, "Users", userId); // Tài liệu của người dùng

    try {
      await updateDoc(userRef, {
        favorites: arrayRemove(productId), // Xóa ID sản phẩm khỏi mảng favorites
      });
      dispatch(removeFavorite(productId)); // Xóa ID sản phẩm khỏi Redux
    } catch (error) {
      console.error("Lỗi khi xóa yêu thích: ", error);
    }
  };

export const { setFavorites, addFavorite, removeFavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
