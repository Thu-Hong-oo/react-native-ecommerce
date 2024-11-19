import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Badge } from "react-native-elements";
import { useSelector } from "react-redux";
import COLORS from "../components/Colors";

export default function CartIcon({ navigation }) {
  // Lấy số lượng sản phẩm trong giỏ hàng từ Redux store
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={styles.iconContainer}>
      {totalQuantity > 0 && (
        <Badge
          value={totalQuantity > 99 ? "99+" : totalQuantity} // Hiển thị "99+" nếu số lượng lớn hơn 99
          status="error"
          containerStyle={styles.badgeContainer}
        />
      )}
      <TouchableOpacity
        style={styles.iconSpacing}
        onPress={() => navigation.navigate("Cart")}
      >
        <AntDesign name="shoppingcart" size={27} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
  },
  badgeContainer: {
    zIndex: 1,
    position: "absolute",
    right: -10,
    top: -5,
  },
  iconSpacing: {
    marginLeft: 15,
  },
});
