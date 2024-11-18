import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { Icon } from "react-native-elements";
import COLORS from "../components/Colors";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  removeFromCart,
  updateCartItemQuantity,
} from "../redux/slices/cartSlice";

const CartRender = ({ item, handleUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity); // Update local state
    handleUpdateQuantity(item.firestoreId, newQuantity); // Update quantity in Redux and Firestore
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      handleUpdateQuantity(item.firestoreId, newQuantity);
    }
  };

  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemLeft}>
        <Image source={{ uri: item.img }} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.colorText}>{item.size}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecrease}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrease}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={styles.price}>${(item.price * quantity).toFixed(2)}</Text>
    </View>
  );
};

export default function Cart({ navigation }) {
  const user = useSelector((state) => state.user.user);
  const userId = user?.id; // Use optional chaining to safely access userId
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId)); // Fetch cart items when userId changes
    }
  }, [dispatch, userId]);

  const handleUpdateQuantity = (firestoreId, newQuantity) => {
    // Kiểm tra userId có tồn tại
    if (!userId) {
      console.error("User ID is not defined");
      return;
    }
    // Kiểm tra firestoreId
    if (!firestoreId) {
      console.error("Firestore ID is required");
      return;
    }

    console.log(
      "Updating quantity for Firestore ID:",
      firestoreId,
      "to",
      newQuantity
    );

    // Gọi action để cập nhật số lượng
    dispatch(
      updateCartItemQuantity({ firestoreId, quantity: newQuantity, userId })
    )
      .unwrap()
      .then(() => {
        console.log("Quantity updated successfully");
      })
      .catch((err) => {
        console.error("Failed to update quantity:", err);
      });
  };

  const handleRemoveItem = (firestoreId) => {
    dispatch(removeFromCart({ userId, firestoreId }))
      .unwrap()
      .then(() => console.log("Item removed successfully"))
      .catch((err) => console.error("Failed to remove item:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" type="fontawesome" size={35} color="#555" />
        </Pressable>
        <Text style={styles.headerTitle}>My Cart</Text>
        <Text></Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.firestoreId} // Use firestoreId as key
        renderItem={({ item }) => (
          <CartRender
            item={item}
            handleUpdateQuantity={handleUpdateQuantity} // Pass update function
          />
        )}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total:</Text>
        <Text style={styles.summaryPrice}>
          ${totalPrice.toFixed(2)} {/* Use totalPrice from Redux */}
        </Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Proceed to Checkout </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight:20,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cartItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemDetails: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    marginLeft: 10,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 8,
  },
  colorText: {
    fontSize: 12,
    color: "gray",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 14,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  summaryPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  checkoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
