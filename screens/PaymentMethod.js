//screens/PaymentMethod.js
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  TextInput,
  ImageBackground,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../services/orderServices";
import { setPaymentMethod } from "../redux/slices/orderSlice";

export default function Screen08({ navigation }) {
  const [checked, setChecked] = React.useState("first");
  const dispatch = useDispatch();
  const finalPrice = useSelector((state) => state.order.finalPrice);
  const selectedItems = useSelector((state) => state.order.selectedItems);
  const totalPrice = useSelector((state) => state.order.totalPrice);
  const voucher = useSelector((state) => state.order.voucher);
  const user = useSelector((state) => state.user.user); // Lấy thông tin người dùng

  const handleOrder = async () => {
    const paymentMethod =
      checked === "first" ? "Thanh toán khi nhận hàng" : "Chuyển khoản";
    dispatch(setPaymentMethod(paymentMethod));
  
    try {
      // Chỉ truyền voucher vào createOrder nếu nó hợp lệ
      const orderId = await createOrder(
        user,
        selectedItems,
        totalPrice,
        voucher && voucher.code ? voucher : null, // Chỉ truyền voucher nếu nó có code
        finalPrice,
        paymentMethod
      );
      console.log("Order created with ID:", orderId);
      navigation.navigate("OrderSucess");
  
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.itemLeft}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon name="left" type="antdesign" size={20} color="gray" />
            </Pressable>
            <Text style={styles.alldeals}>Payment</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 10 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.totalPrice}>
              <Text style={styles.totalPriceText1}>
                Số tiền cần thanh toán:
              </Text>
              <Text style={styles.totalPriceText2}>${finalPrice}</Text>
            </View>

            <View style={styles.paymentMethod}>
              <View style={styles.paymentMethodEach}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/10351/10351751.png",
                    }} // Sử dụng uri cho hình ảnh từ URL
                    style={styles.paymentMethodEachImg}
                  />
                  <Text style={styles.paymentMethodEachText}>
                    THANH TOÁN KHI {"\n"} NHẬN HÀNG
                  </Text>
                </View>
                <RadioButton
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                  color="#E73E00"
                />
              </View>
              <View style={styles.paymentMethodEach}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{
                      uri: "https://cdn2.iconfinder.com/data/icons/fintech-butterscotch-vol-2/512/Internet_Banking-512.png",
                    }} // Sử dụng uri cho hình ảnh từ URL
                    style={styles.paymentMethodEachImg}
                  />
                  <Text style={styles.paymentMethodEachText}>CHUYỂN KHOẢN</Text>
                </View>
                <RadioButton
                  value="second"
                  status={checked === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked("second")}
                  color="#E73E00"
                />
              </View>
            </View>

            <View style={styles.paynow}>
              <Pressable style={styles.buttonPaynow} onPress={handleOrder}>
                <Icon name="payments" color="white" size={32} />
                <Text style={styles.buttonPaynowText}>Đặt hàng</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 3,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  itemRight: { flexDirection: "row", alignItems: "center" },
  alldeals: { paddingHorizontal: 10, fontSize: 16, fontWeight: "bold" },
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "flex-start",
  },
  totalPrice: {
    alignItems: "center",
  },
  totalPriceText1: {
    fontWeight: 700,
    fontSize: 30,
  },
  totalPriceText2: {
    fontWeight: 100,
    fontSize: 30,
    color: "#FF6026",
  },
  paymentMethodEach: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: "#BCC1CA",
    borderRadius: 6,
    marginHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 8,
  },
  paymentMethodEachImg: {
    width: 35,
    height: 35,
    borderRadius: "100%",
    borderWidth: 0.5,
    borderColor: "#BCC1CA",
  },
  paymentMethodEachText: {
    fontSize: 16,
    color: "#323842",
    lineHeight: 28,
    paddingHorizontal: 8,
  },
  paynow: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  buttonPaynow: {
    backgroundColor: "#FF6026",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 6,
    paddingVertical: 10,
  },
  buttonPaynowText: {
    color: "white",
    fontWeight: 400,
    fontSize: 20,
    paddingHorizontal: 8,
  },
  addNewCardText: {
    color: "#FF6026",
    fontWeight: 400,
    fontSize: 20,
    paddingHorizontal: 8,
  },
});
