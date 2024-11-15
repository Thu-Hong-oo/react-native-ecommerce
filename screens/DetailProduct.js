import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { Icon, Rating, Switch } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLORS from "../components/Colors";
import { useState } from "react";
import ProductRating from "../components/ProductRating";
import { useSelector } from "react-redux";
export default function DetailProduct({ navigation }) {
  // Truy cập sản phẩm đã chọn từ Redux store
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  console.log(selectedProduct);

  const [isEnabled, setIsEnabled] = useState(false); // Trạng thái của Switch
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
  const renderRelevant = ({ item }) => (
    <View
      style={{
        width: 130,
        height: 180,
        margin: 10,
        flex: 1,
        backgroundColor: COLORS.gray,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.gray,
          width: "100%",
          height: 120,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={item.img} style={{ width: 120, height: 120 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8,
          marginHorizontal: 10,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
          marginHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Icon name="star" color={COLORS.yellow} size={20} />
          <Text>{item.rating}</Text>
        </View>

        <Text style={{ fontWeight: "bold" }}>${item.price}</Text>
      </View>
    </View>
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
            <Text style={styles.alldeals}>Headphone</Text>
          </View>

          <View style={styles.itemRight}>
            <AntDesign name="shoppingcart" size={25} color={COLORS.primary} />
            <Image
              source={require("../assets/imgs/avata.png")}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 10 }}>
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <View style={styles.banner}>
            <Image
              source={{ uri: selectedProduct.mainImage }}
              style={{ width: "100%", height: 200, borderRadius: 10 }}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>$59</Text>
            <View style={styles.row}>
              <Icon name="star" color="#F3C63F" />
              <Text style={{ fontWeight: "bold" }}>4.5</Text>
              <Text>(99 reviews)</Text>
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.boldText}>Description</Text>
            <Text style={styles.grayText}>
              Quis occaecat magna elit magna do nisi ipsum amet excepteur tempor
              nisi exercitation qui...
            </Text>

            <View
              style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  marginBottom: 20,
                }}
              >
                <Icon
                  name="truck-outline"
                  type="material-community"
                  color={COLORS.orange}
                  size={20}
                />
                <Text style={styles.grayText}>Express</Text>
              </View>
              <View style={{ flexDirection: "row", width: "50%" }}>
                <Icon
                  name="back"
                  type="antdesign"
                  color={COLORS.orange}
                  size={20}
                />
                <Text style={styles.grayText}>30-day free return</Text>
              </View>
              <View style={{ flexDirection: "row", width: "50%" }}>
                <Icon name="star" color={COLORS.orange} size={20} />
                <Text style={styles.grayText}>Good review</Text>
              </View>
              <View style={{ flexDirection: "row", width: "50%" }}>
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>See all</Text>
                <Icon
                  name="triangle-right"
                  type="entypo"
                  size={15}
                  color="gray"
                />
              </View>
            </View>
            <View>
              <FlatList
                data={data}
                renderItem={renderRelevant}
                horizontal={true}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>

          <View style={styles.notify}>
            <Icon
              name="bell"
              type="fontisto"
              color="white"
              style={{
                backgroundColor: COLORS.primary,
                padding: 10,
                borderRadius: 5,
              }}
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
  alldeals: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },

  body: {
    flex: 1,
    marginTop: 10,
  },

  banner: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "green",
    marginHorizontal: 15,
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
});
