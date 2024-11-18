import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons"; // Icon library
import COLORS from "./Colors";
import { useSelector } from "react-redux";

export default function CartModal({ visible, onClose }) {
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const [quantity, setQuantity] = useState(1); // State for quantity

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1); // Ensure quantity doesn't go below 1
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const handleAddToCart = () => {
    if (selectedOption && selectedSize) {
      console.log("Added to Cart:", {
        product: selectedProduct,
        quantity,
        selectedOption,
        selectedSize,
      });
      onClose(); // Close modal after adding to cart
    } else {
      alert("Please select an option and size before adding to cart.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Modal
        visible={visible}
        statusBarTranslucent={true}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.content}>
          <View style={styles.card}>
            {/* Close button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                console.log("Close button pressed");
                onClose();
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.imgAndPrice}>
              <Image
                source={selectedProduct.mainImage}
                style={styles.imgModal}
              />
              <Text style={styles.priceText}>
                $ {(selectedProduct.price * quantity).toFixed(2)}
              </Text>
            </View>

            <Text style={styles.colorText}>Options</Text>
            <View style={styles.colorContainer}>
              {selectedProduct.subImages &&
                selectedProduct.subImages.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorButton,
                      selectedOption === item.name && styles.selectedButton,
                    ]}
                    onPress={() => {
                      setSelectedOption(item.name);
                      setSelectedSize(null); // Reset size khi chọn option khác
                    }}
                  >
                    <Text style={styles.buttonText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>

            {/* Sizes (Chỉ hiển thị khi đã chọn option) */}
            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <>
                <Text style={styles.colorText}>Sizes</Text>
                <View style={styles.colorContainer}>
                  {selectedProduct.sizes.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.colorButton,
                        selectedSize === item && styles.selectedButton,
                      ]}
                      onPress={() => setSelectedSize(item)}
                    >
                      <Text style={styles.buttonText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            <View style={styles.quantityRow}>
              <Text style={styles.colorText}>Quantity</Text>
              <View style={styles.quantityNumber}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={decreaseQuantity}
                >
                  <AntDesign name="minus" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={increaseQuantity}
                >
                  <AntDesign name="plus" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.buttonAddOrBuy]}
              onPress={() => {
                console.log("Added to Cart with Quantity:", quantity);
                onClose(); // Close modal after adding to cart
              }}
            >
              <Text style={styles.textbuttonAddOrBuy}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedButton: {
    borderColor: COLORS.red,
    borderWidth: 2,
  },
  colorButton: {
    backgroundColor: "#F3F4F6",
    marginRight: 15,
    width: 75,
    alignItems: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  imgModal: {
    width: 80,
    height: 80,
  },
  imgAndPrice: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  priceText: {
    color: COLORS.red,
    marginLeft: 20,
    fontSize: 16,
    fontWeight:600,
  },
  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    marginBottom: 50,
  },
  buttonAddOrBuy: {
    width: "100%",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  textbuttonAddOrBuy: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityNumber: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
