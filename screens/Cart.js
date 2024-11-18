import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  CheckBox,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import COLORS from "../components/Colors";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  calculateTotalPrice,
} from "../redux/slices/cartSlice";

const CartRender = ({ item, handleUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity); //cập nhật giao diện
    handleUpdateQuantity(item.id, newQuantity); // Cập nhật số lượng trong Redux và firebase
  };
  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      handleUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemLeft}>
        <CheckBox style={styles.checkbox} />
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
  const userId = user.id;
  const { items, totalPrice, status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const calculatedTotalPrice = items.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  useEffect(() => {
    dispatch(fetchCartItems(userId));
  }, [dispatch, userId]);

  const handleAddItem = (item) => {
    dispatch(addToCart({ userId, item }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart({ userId, itemId }));
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (!itemId) {
      console.error("Item ID is required");
      return;
    }

    dispatch(updateCartItemQuantity({ userId, itemId, quantity: newQuantity }))
      .unwrap()
      .then(() => console.log("Quantity updated successfully"))
      .catch((err) => console.error("Failed to update quantity:", err));
  };

  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [items, dispatch]);

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartRender
            item={item}
            handleUpdateQuantity={handleUpdateQuantity} // Sử dụng hàm cha
          />
        )}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total:</Text>
        <Text style={styles.summaryPrice}>
          ${calculatedTotalPrice.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
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
    flex: 1, // Đảm bảo rằng phần này chiếm không gian còn lại
  },
  itemDetails: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    overflow: "hidden", // Đảm bảo rằng văn bản không tràn ra ngoài
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",

    marginLeft: 10, // Thêm khoảng cách giữa tên và giá
  },
  checkbox: {
    marginRight: 8,
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

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
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
