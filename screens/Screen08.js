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
} from "react-native";
import { Icon } from "react-native-elements";
import { RadioButton } from "react-native-paper";

export default function Screen08({ navigation }) {
  const [checked, setChecked] = React.useState("first");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.itemLeft}>
            <Pressable>
              <Icon name="left" type="antdesign" size={20} color="gray" />
            </Pressable>
            <Text style={styles.alldeals}>Payment</Text>
          </View>

          <View style={styles.itemRight}>
            <Icon name="cart-outline" type="ionicon" size={20} color="gray" />
            <Image
              source={require("../assets/imgs/beauty.png")}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 10 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.totalPrice}>
            <Text style={styles.totalPriceText1}>Total</Text>
            <Text style={styles.totalPriceText2}>$3.080</Text>
          </View>

          <View style={styles.paymentMethod}>
            <View style={styles.paymentMethodEach}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/imgs/beauty.png")}
                  style={styles.paymentMethodEachImg}
                />
                <Text style={styles.paymentMethodEachText}>****** 2334</Text>
              </View>
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
                color="#E73E00"
              />
            </View>
            <View style={styles.paymentMethodEach}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/imgs/beauty.png")}
                  style={styles.paymentMethodEachImg}
                />
                <Text style={styles.paymentMethodEachText}>****** 2334</Text>
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
            <Pressable style={styles.buttonPaynow}>
              <Icon name="payments" color="white" size={32} />
              <Text style={styles.buttonPaynowText}>Pay now </Text>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: 10,
            }}
          >
            <Icon name="add" color="#FF6026" size={32} />
            <Pressable>
              <Text style={styles.addNewCardText}>Add new card </Text>
            </Pressable>
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
