import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import COLORS from "../components/Colors";

const Screen07 = ({ navigation }) => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <Icon name="left" type="antdesign" size={20} color="gray" />
      <Text style={styles.title}>Checkout</Text>
      <View style={{ width: 24 }} />
    </View>

    {/* Cart Items */}
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.cartItems}>
        {[
          {
            id: 1,
            name: "Headphone",
            price: "$500",
            quantity: "x1",
            image: require("../assets/imgs/headphone.png"),
          },
          {
            id: 2,
            name: "Headphone",
            price: "$300",
            quantity: "x1",
            image: require("../assets/imgs/headphone2.png"),
          },
          {
            id: 3,
            name: "Smartphone",
            price: "$1000",
            quantity: "x1",
            image: require("../assets/imgs/mobileHeader.png"),
          },
          {
            id: 4,
            name: "Smartphone",
            price: "$1000",
            quantity: "x1",
            image: require("../assets/imgs/mobileHeader.png"),
          },
        ].map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>Consequat ex eu</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <View style={styles.itemPriceContainer}>
              <Icon name="edit" size={20} color="gray" />
              <Text style={styles.itemQuantity}>{item.quantity}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Voucher and Total */}
      <Text style={styles.voucherLabel}>Voucher</Text>
      <View style={styles.voucherContainer}>
        <TextInput
          placeholder="Enter voucher code"
          placeholderTextColor="gray"
          style={styles.voucherInput}
        />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <Text style={styles.totalAmount}>$2,800</Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
        <FontAwesome name="arrow-right" size={15} color="white" />
      </TouchableOpacity>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  cartItems: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    color: "gray",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemQuantity: {
    marginLeft: 5,
    color: "gray",
  },
  voucherLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  voucherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  voucherInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default Screen07;
