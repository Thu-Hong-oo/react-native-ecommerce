import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { fetchFavorites } from "../services/favoriteService"; // Nhập hàm fetchFavorites từ service
import { getAllProducts } from "../services/productService";
import {
  loadFavoriteItems,
  saveProductToFavorites,
  deleteProductFromFavorites,
} from "../redux/slices/favoriteSlice";
export default function Favorite() {
  //
  const [favoriteIds, setFavoriteIds] = useState([]);
  useEffect(() => {
    const loadFavorites = async () => {
      const favorites = await fetchFavorites(); // Lấy danh sách ID sản phẩm yêu thích
      setFavoriteIds(favorites); // Cập nhật danh sách ID yêu thích
    };

    loadFavorites();
  }, []);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getAllProducts(); // Gọi hàm từ productService
        setProducts(productData); // Cập nhật danh sách sản phẩm
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm: ", error);
      } finally {
        setLoading(false); // Đặt loading thành false sau khi lấy dữ liệu
      }
    };
    fetchProducts();
  }, []);

  const favoriteProducts = products.filter((product) =>
    favoriteIds.includes(product.id)
  );
  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={item.mainImage}
        style={styles.productImage}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.heartIconContainer}
        onPress={() => {
          if (isFavorite) {
            dispatch(deleteProductFromFavorites(item.id)); // Xóa khỏi yêu thích
          } else {
            dispatch(saveProductToFavorites(item.id)); // Lưu vào yêu thích
          }
        }}
      >
        <Ionicons
          name="heart" // Sử dụng biểu tượng khác nhau
          size={23}
          color="#FF6B6B" // Màu sắc
        />
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorite</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search something..."
          placeholderTextColor="gray"
          style={styles.searchInput}
        />
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity style={[styles.filterButton, styles.filterActive]}>
          <Text style={styles.filterTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Latest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Most Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Cheapest</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={favoriteProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  searchContainer: {
    position: "relative",
    marginBottom: 16,
  },
  searchInput: {
    width: "100%",
    padding: 12,
    paddingLeft: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 24,
    fontSize: 14,
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: [{ translateY: -11 }],
  },
  filters: {
    flexDirection: "row",
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#e5e5e5",
    marginRight: 8,
  },
  filterActive: {
    backgroundColor: "#6B46C1",
  },
  filterText: {
    fontSize: 14,
    color: "#333",
  },
  filterTextActive: {
    fontSize: 14,
    color: "white",
  },
  productRow: {
    justifyContent: "space-between",
  },
  productContainer: {
    width: "48%",
    position: "relative",
    marginBottom: 16,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 5,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  heartIconContainer: {
    position: "absolute",
    top: 3,
    right: 3,
    borderRadius: 20,
    padding: 2,
  },
  productInfo: {
    marginTop: 8,
    alignItems: "center",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  productCategory: {
    fontSize: 12,
    color: "#888",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
