import React, { useEffect,useState} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import COLORS from "../components/Colors";
import Icon from "react-native-vector-icons/FontAwesome";

export default function MyOrder() {
  const [activeTab, setActiveTab] = useState("order");
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="chevron-left" size={20} color="#1F2937" />
        <Text style={styles.headerTitle}>My Order</Text>
       <Text></Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab("order")}>
          <Text style={activeTab === "order" ? styles.tabActive : styles.tab}>
            Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("history")}>
          <Text
            style={activeTab === "history" ? styles.tabActive : styles.tab}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders */}
      <View style={styles.orderCard}>
        <Image
          source={{ uri: "https://placehold.co/80x80" }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>Bix Bag Limited Edition 229</Text>
          <Text style={styles.productInfo}>Color: Berown</Text>
          <Text style={styles.productInfo}>Qty: 1</Text>
        </View>
        <View style={styles.orderStatus}>
          <Text style={styles.statusBadge}>On Progress</Text>
          <Text style={styles.productPrice}>$ 24.00</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.trackingButton}>
          <Text style={styles.trackingButtonText}>Tracking</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orderCard}>
        <Image
          source={{ uri: "https://placehold.co/80x80" }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>Bix Bag 319</Text>
          <Text style={styles.productInfo}>Color: Berown</Text>
          <Text style={styles.productInfo}>Qty: 1</Text>
        </View>
        <View style={styles.orderStatus}>
          <Text style={styles.statusBadge}>On Progress</Text>
          <Text style={styles.productPrice}>$ 21.50</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.trackingButton}>
          <Text style={styles.trackingButtonText}>Tracking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-around",
  },
  tab: {
    fontSize: 16,
    color: "#6B7280",
    marginRight: 16,
  },
  tabActive: {
    fontSize: 16,
    fontWeight: "500",
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 16,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  inactiveTabText: {
    color: "#9CA3AF",
    marginHorizontal: 16,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  productInfo: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  orderStatus: {
    alignItems: "flex-end",
  },
  statusBadge: {
    backgroundColor: "#DBEAFE",
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "500",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailButton: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  detailButtonText: {
    fontSize: 14,
    color: "#6B7280",
  },
  trackingButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  trackingButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});
