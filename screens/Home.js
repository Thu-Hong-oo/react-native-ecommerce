import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLORS from "../components/Colors";
import Carousel from "../components/Carousel";
import Category from "../components/Category";
import { app } from "../config/firebaseConfig";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  orderBy,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector
import { setSelectedProduct } from "../redux/slices/productSlice";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Lấy thông tin người dùng từ Redux store

  if (!user) {
    return <Text>Loading...</Text>; // Hiển thị Loading khi chưa có thông tin người dùng
  }

  const db = getFirestore(app);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("home"); // State để theo dõi tab hiện tại

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const productQuery = query(
        collection(db, "Products"),
        orderBy("createdAt", "desc") // Sắp xếp theo createdAt giảm dần
      );
      const querySnapshot = await getDocs(productQuery); // Lấy dữ liệu từ Firestore
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); // Thêm id vào mỗi sản phẩm
      setProducts(data); // Cập nhật state với dữ liệu sản phẩm
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm: ", error); // Xử lý lỗi
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        dispatch(setSelectedProduct(item)); // Cập nhật sản phẩm đã chọn
        navigation.navigate("DetailProduct"); // Điều hướng đến màn hình chi tiết
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.heartIconContainer}
          onPress={() => console.log(`Liked ${item.name}`)}
        >
          <Icon name="heart" type="feather" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}$</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userProfile}>
          <Image source={user.avatar} style={styles.userImage} />
          <View>
            <Text style={styles.userText}>Hi, {user.name}</Text>
            <Text style={styles.userSubText}>Let's go shopping</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Icon
              name="search"
              type="feather"
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconSpacing} onPress={()=>navigation.navigate("Cart")}> 
            <AntDesign
              name="shoppingcart"
              type="feather"
              size={25}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab("home")}>
          <Text style={activeTab === "home" ? styles.tabActive : styles.tab}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("category")}>
          <Text
            style={activeTab === "category" ? styles.tabActive : styles.tab}
          >
            Category
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "home" && (
        <>
          <Carousel />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals 🔥</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        </>
      )}

      {activeTab === "category" && <Category navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userText: {
    fontSize: 14,
    fontWeight: "500",
  },
  userSubText: {
    fontSize: 12,
    color: "#6B7280",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginLeft: 15,
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
  categoryTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
  },
  row: {
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 100,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  heartIconContainer: {
    position: "absolute",
    top: 3,
    right: 3,
    borderRadius: 20,
    padding: 2,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
    color: "red",
  },
});
