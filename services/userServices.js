// src/services/userService.js

import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";

// Hàm lấy dữ liệu người dùng từ Firestore
export async function fetchUserData(userId) {
  try {
    const userRef = doc(db, "Users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error.message);
    return null;
  }
}
