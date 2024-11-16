import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Icon } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLORS from "../components/Colors";
import { useState } from "react";
import ProductRating from "../components/ProductRating";
import { useSelector } from "react-redux";

export default function DetailProduct({ navigation }) {
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  console.log(selectedProduct);
  const user = useSelector((state) => state.user.user);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [data, setData] = useState([
    {
      name: "Headphone",
      img: require("../assets/imgs/headphone.png"),
      price: 99,
      rating: 4.5,
    },
    {
      name: "Headphone",
      img: require("../assets/imgs/headphone2.png"),
      price: 99,
      rating: 4.9,
    },
    {
      name: "Headphone",
      img: require("../assets/imgs/headphone.png"),
      price: 99,
      rating: 4.5,
    },
    {
      name: "Headphone",
      img: require("../assets/imgs/headphone.png"),
      price: 99,
      rating: 4.5,
    },
    {
      name: "Headphone",
      img: require("../assets/imgs/headphone.png"),
      price: 99,
      rating: 4.5,
    },
  ]);
  // State để lưu ảnh chính và tên danh mục
  const [mainImage, setMainImage] = useState(selectedProduct.mainImage);
  const [currentCategory, setCurrentCategory] = useState(
    `${selectedProduct.subImages.length} available categories`
  );

  const handleSubImagePress = (item) => {
    setMainImage(item.img); // Cập nhật ảnh chính
    setCurrentCategory(item.name); // Cập nhật tên danh mục
  };

  const renderRelevant = ({ item }) => (
    <View style={styles.relevantItem}>
      <View style={styles.relevantImageContainer}>
        <Image source={item.img} style={styles.relevantImage} />
      </View>
      <View style={styles.relevantInfo}>
        <Text style={styles.relevantName}>{item.name}</Text>
        <View style={styles.relevantPriceContainer}>
          <Icon name="star" color={COLORS.yellow} size={20} />
          <Text>{item.rating}</Text>
          <Text style={styles.relevantPrice}>${item.price}</Text>
        </View>
      </View>
    </View>
  );

  const renderSubImages = ({ item }) => (
    <Pressable
      onPress={() => handleSubImagePress(item)}
      style={styles.subImageContainer}
    >
      <Image source={{ uri: item.img }} style={styles.subImage} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.itemLeft}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-left"
                type="fontawesome"
                size={35}
                color="#555"
              />
            </Pressable>
          </View>
          <View style={styles.itemRight}>
            <AntDesign name="shoppingcart" size={25} color={COLORS.primary} />
            <Image source={user.avatar} style={styles.userImage} />
          </View>
        </View>
      </View>

      <View style={{ flex: 10 }}>
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <View style={styles.banner}>
            <Image
              source={{ uri: mainImage }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
          {selectedProduct.subImages &&
            selectedProduct.subImages.length > 1 && (
              <View style={styles.subImageList}>
                <Text>{currentCategory}</Text>
                <FlatList
                  data={selectedProduct.subImages}
                  renderItem={renderSubImages}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
          <Text style={styles.nameProduct}>{selectedProduct.name}</Text>
          <View style={styles.row}>
            <Text style={styles.productPrice}>${selectedProduct.price}</Text>
            <View style={styles.row}>
              <Icon name="star" color="#F3C63F" /> 
              <Text style={styles.ratingText}>{selectedProduct.rating}</Text>
              <Text>(99 reviews)</Text>
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.boldText}>Description</Text>
            <Text style={styles.grayText}>{selectedProduct.description}</Text>
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Icon
                  name="truck-outline"
                  type="material-community"
                  color={COLORS.orange}
                  size={20}
                />
                <Text style={styles.grayText}>Express</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon
                  name="back"
                  type="antdesign"
                  color={COLORS.orange}
                  size={20}
                />
                <Text style={styles.grayText}>30-day free return</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="star" color={COLORS.orange} size={20} />
                <Text style={styles.grayText}>Good review</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon
                  name="award"
                  type="feather"
                  color={COLORS.orange}
                  size={20}
                />
                <Text style={styles.grayText}>Authorized shop</Text>
              </View>
            </View>
          </View>
          <View style={styles.reviews}>
            <ProductRating />
          </View>
          <View style={styles.relevantProduct}>
            <View style={styles.row}>
              <Text style={styles.boldText}>Categories</Text>
              <View style={styles.seeAllContainer}>
                <Text>See all</Text>
                <Icon
                  name="triangle-right"
                  type="entypo"
                  size={15}
                  color="gray"
                />
              </View>
            </View>
            <FlatList
              data={data}
              renderItem={renderRelevant}
              horizontal={true}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.notify}>
            <Icon
              name="bell"
              type="fontisto"
              color="white"
              style={styles.notifyIcon}
            />
            <Text>Notify me of promotions</Text>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View style={styles.btnCart}>
          <Icon
            name="add-shopping-cart"
            type="materialIcons"
            color={COLORS.primary}
          />
        </View>
        <TouchableOpacity style={styles.btnBuyNow}>
          <Text style={styles.textBuyNow}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "column",
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  nameProduct: {
    paddingHorizontal: 15,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    flex: 1,
  },
  banner: {
    borderRadius: 10,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 180,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  subImageList: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  subImageContainer: {
    marginRight: 10,
  },
  subImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  footer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f8f8f8",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  btnCart: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: COLORS.primary,
  },
  btnBuyNow: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    flex: 1,
    marginLeft: 10,
    borderRadius: 5,
  },
  textBuyNow: {
    color: "white",
    textAlign: "center",
  },
  grayText: {
    color: "#9095A0",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  description: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 15,
  },
  reviews: {
    marginBottom: 15,
    marginHorizontal: 15,
  },
  relevantProduct: {
    borderTopWidth: 1,
    borderColor: "#F3F4F6",
    paddingVertical: 20,
  },
  notify: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.gray,
    marginHorizontal: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  notifyIcon: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  relevantItem: {
    width: 130,
    height: 180,
    margin: 10,
    flex: 1,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
  },
  relevantImageContainer: {
    backgroundColor: COLORS.gray,
    width: "100%",
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  relevantImage: {
    width: 120,
    height: 120,
  },
  relevantInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginHorizontal: 10,
  },
  relevantName: {
    fontWeight: "bold",
  },
  relevantPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginHorizontal: 10,
  },
  relevantPrice: {
    fontWeight: "bold",
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 20,
  },
  ratingText: {
    fontWeight: "bold",
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  featureItem: {
    flexDirection: "row",
    width: "50%",
    marginBottom: 20,
  },
  seeAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
