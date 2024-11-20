import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  saveSearch,
  fetchRecentSearches,
  clearSearchHistory,
} from "../services/searchHistoryService";
import { db } from "../config/firebaseConfig";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  startAt,
  endAt,
} from "firebase/firestore";
import { getAllProducts } from "../services/productService";

export default function Search({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSearches, setLastSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // Gợi ý tên sản phẩm

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getAllProducts();
        setProducts(productData); // Cập nhật danh sách sản phẩm
        console.log("data: ", productData); // Log dữ liệu sản phẩm
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm: ", error);
      } finally {
        setLoading(false); // Đặt loading thành false sau khi lấy dữ liệu
      }
    };

    // Hàm tải lịch sử tìm kiếm
    const loadRecentSearches = async () => {
      const searches = await fetchRecentSearches();
      setLastSearches(searches);
    };

    fetchProducts();
    loadRecentSearches();
  }, []);

  // Hàm lấy gợi ý sản phẩm
  const fetchProductSuggestions = async (queryText) => {
    if (queryText.trim() === "") {
      setSuggestions([]);
      return;
    }

    const productsRef = collection(db, "Products");
    const q = query(
      productsRef,
      orderBy("name"),
      startAt(queryText),
      endAt(queryText + "\uf8ff"),
      limit(10) // Giới hạn số gợi ý
    );

    try {
      const querySnapshot = await getDocs(q);
      const productSuggestions = querySnapshot.docs.map(
        (doc) => doc.data().name
      ); // Lấy tên sản phẩm
      console.log("Product Suggestions: ", productSuggestions); // Log gợi ý
      setSuggestions(productSuggestions);
    } catch (error) {
      console.error("Lỗi khi lấy gợi ý sản phẩm: ", error);
    }
  };

  // Hàm xử lý khi người dùng thay đổi ô tìm kiếm
  const handleSearchInputChange = (text) => {
    setSearchQuery(text);
    fetchProductSuggestions(text); // Cập nhật gợi ý khi người dùng nhập từ khóa
  };

  // Hàm xử lý khi người dùng nhấn tìm kiếm
  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      await saveSearch(searchQuery); // Lưu từ khóa tìm kiếm
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts); // Cập nhật danh sách sản phẩm hiển thị
      setSearchQuery("");
      loadRecentSearches(); // Tải lại lịch sử tìm kiếm
      setSuggestions([]); // Xóa gợi ý
    }
  };

  // Hàm xóa tất cả lịch sử tìm kiếm
  const handleClearHistory = async () => {
    await clearSearchHistory();
    setLastSearches([]); // Xóa hiển thị trong giao diện
  };

  const popularSearches = [
    {
      name: "Lunilo Hilis jacket",
      searches: "1.6k Search today",
      label: "Hot",
      labelColor: "#EF4444",
      img: "https://plus.unsplash.com/premium_photo-1683121231638-4100d7f6deb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8amFja2V0fGVufDB8fDB8fHww "},
    {
      name: "Denim Jeans",
      searches: "1k Search today",
      label: "New",
      labelColor: "#F59E0B",
      img: "https://m.media-amazon.com/images/I/91MZMCGta6S._AC_UL320_.jpg",
    },
    {
      name: "Redil Backpack",
      searches: "1.23k Search today",
      label: "Popular",
      labelColor: "#10B981",
      img: "https://plus.unsplash.com/premium_photo-1723649902734-60ec42167731?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "JBL Speakers",
      searches: "1k Search today",
      label: "New",
      labelColor: "#F59E0B",
      img: "https://m.media-amazon.com/images/I/61soDqkXGtL._AC_UL320_.jpg",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            size={20}
            color="#555"
            style={styles.backIcon}
          />
        </Pressable>

        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearchInputChange} // Gọi hàm để cập nhật gợi ý
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery(item);
                  handleSearch();
                }}
                style={styles.suggestionItem}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Last Search Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Last Search</Text>
          <TouchableOpacity onPress={handleClearHistory}>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tagsContainer}>
          {lastSearches.map((tag, index) => (
            <View style={styles.tag} key={index}>
              <Text style={styles.tagText}>{tag}</Text>
              <Icon
                name="times"
                size={12}
                color="#555"
                style={styles.tagIcon}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Popular Search Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Search</Text>
        {popularSearches.map((item, index) => (
          <View style={styles.popularItem} key={index}>
            <Image source={{ uri: item.img }} style={styles.popularImage} />
            <View style={styles.popularTextContainer}>
              <Text style={styles.popularTitle}>{item.name}</Text>
              <Text style={styles.popularSearches}>{item.searches}</Text>
            </View>
            <View style={[styles.label, { backgroundColor: item.labelColor }]}>
              <Text style={styles.labelText}>{item.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  suggestionsContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginTop: 8,
    padding: 8,
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomColor: "#E5E7EB",
 borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
    color: "#374151",
  },
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backIcon: {
    marginRight: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  clearButton: {
    fontSize: 14,
    color: "#8B5CF6",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#4B5563",
    marginRight: 4,
  },
  tagIcon: {
    marginLeft: 4,
  },
  popularItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  popularImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  popularTextContainer: {
    flex: 1,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  popularSearches: {
    fontSize: 12,
    color: "#6B7280",
  },
  label: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  labelText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
});