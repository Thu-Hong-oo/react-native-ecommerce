import { db } from "../config/firebaseConfig"; // Đường dẫn đúng
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";

// Fetch Cart Items
export const fetchCartItemsFromService = async (userId) => {
  const cartRef = collection(doc(db, "Users", userId), "cart");
  const snapshot = await getDocs(cartRef);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate().toISOString(), // Chuyển đổi Timestamp thành chuỗi ISO
    };
  });
};

export const addToCartInService = async (userId, item) => {
  if (!userId) {
    throw new Error("User  ID is required");
  }
  const cartRef = collection(doc(db, "Users", userId), "cart");

  try {
    // Kiểm tra sản phẩm đã tồn tại hay chưa
    const existingItemQuery = query(cartRef, where("id", "==", item.id));
    const snapshot = await getDocs(existingItemQuery);

    if (!snapshot.empty) {
      // Sản phẩm đã tồn tại -> cập nhật số lượng
      const existingDoc = snapshot.docs[0];
      const existingData = existingDoc.data();
      const newQuantity = existingData.quantity + (item.quantity || 1);

      await updateDoc(existingDoc.ref, { quantity: newQuantity });
      return { id: existingDoc.id, ...existingData, quantity: newQuantity };
    } else {
      // Sản phẩm chưa tồn tại -> thêm mới với id là item.id
      const docRef = doc(cartRef, item.id); // Tạo tham chiếu đến tài liệu với id là item.id
      await setDoc(docRef, { ...item, quantity: item.quantity || 1 }); // Thêm sản phẩm mới
      return { id: docRef.id, ...item, quantity: item.quantity || 1 };
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw new Error("Failed to add item to cart");
  }
};

// Remove Item from Cart
export const removeFromCartInService = async (userId, itemId) => {
  const cartRef = doc(db, "Users", userId, "cart", itemId);
  await deleteDoc(cartRef);
};

// Update Item Quantity
export const updateCartItemQuantityInService = async (
  userId,
  itemId,
  quantity
) => {
  const cartRef = doc(db, "Users", userId, "cart", itemId);

  try {
    // Kiểm tra sự tồn tại của tài liệu
    const docSnapshot = await getDoc(cartRef);
    if (!docSnapshot.exists()) {
      throw new Error(`No document to update: ${cartRef.path}`);
    }

    // Cập nhật nếu tài liệu tồn tại
    await updateDoc(cartRef, { quantity });
    return { itemId, quantity };
  } catch (error) {
    console.error("Error updating item quantity:", error);
    throw error; // Truyền lỗi để xử lý ở Redux slice
  }
};
