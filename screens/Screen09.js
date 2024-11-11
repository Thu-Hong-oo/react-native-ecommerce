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
import { Icon, Rating } from "react-native-elements";

export default function Screen09({ navigation }) {
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
        <View style={{ flex: 1 }}>
          <View style={styles.notice}>
            <View style={styles.noticeIcon}>
              <Icon name="check" color="white" size={42} />
            </View>
            <Text style={styles.noticeText1}>Order placed successfully!</Text>

            <Text style={styles.noticeText2}>
              Commodo eu ut sunt qui minim fugiat elit nisi enim
            </Text>
          </View>

          <View style={styles.paymentDetail}>
            <View style={styles.paymentDetailEach}>
              <Text style={styles.paymentDetailEachText1}>Subtotal</Text>
              <Text style={styles.paymentDetailEachText1}>$2,800</Text>
            </View>

            <View style={styles.paymentDetailEach}>
              <Text style={styles.paymentDetailEachText1}>Tax (10%)</Text>
              <Text style={styles.paymentDetailEachText1}>$280</Text>
            </View>

            <View style={styles.paymentDetailEach}>
              <Text style={styles.paymentDetailEachText1}>Fees</Text>
              <Text style={styles.paymentDetailEachText1}>$0</Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <View style={[styles.hr, { width: "90%" }]} />
            </View>

            <View style={styles.paymentDetailEach}>
              <Text style={styles.paymentDetailEachText1}>Card</Text>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/imgs/beauty.png")}
                  style={styles.paymentMethodEachImg}
                />
                <Text style={styles.paymentDetailEachText1}>****** 2334</Text>
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
              <View style={[styles.hr, { width: "90%" }]} />
            </View>

            <View style={styles.paymentDetailEach}>
              <Text style={styles.paymentDetailEachText1}>Total</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.paymentDetailEachSucessIcon}>Sucess</Text>
                <Text style={styles.paymentDetailEachText1}>$0</Text>
              </View>
            </View>
          </View>

          <View style={styles.ratingExperience}>
            <Text style={styles.ratingExperienceText}>
              How was your experience?
            </Text>
            <Rating
              type="custom"
              ratingColor="#F3C63F"
              ratingBackgroundColor="#DEE1E6"
              ratingCount={5}
              imageSize={20}
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10, width: "90%" }}
            />
          </View>

          <View style={styles.backToHome}>
            <Pressable style={styles.buttonBackToHome}>
              <Icon name="house" color="white" size={32} />
              <Text style={styles.buttonBackToHomeText}>Back to home </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hr: { height: 1, backgroundColor: "lightgray", marginTop: 10 },

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

  notice: {
    alignItems: "center",
    flex: 4,
  },
  noticeIcon: {
    backgroundColor: "#17A948",
    height: 70,
    width: 70,
    justifyContent: "center",
    borderRadius: "100%",
  },
  noticeText1: {
    paddingTop: 10,
    color: "#FF6026",
    fontWeight: 500,
    fontSize: 20,
    paddingHorizontal: 8,
  },
  noticeText2: {
    paddingTop: 10,
    color: "#9095A0",
    fontWeight: 500,
    fontSize: 15,
    width: "75%",
    textAlign: "center",
  },

  paymentMethodEachImg: {
    width: 35,
    height: 35,
    borderRadius: "100%",
    borderWidth: 0.5,
    borderColor: "#BCC1CA",
  },
  paymentDetail: {
    backgroundColor: "#FAFAFB",
    paddingVertical: 20,
    margin: 10,
    borderRadius: 6,
    flex: 4.5,
  },
  paymentDetailEach: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  paymentDetailEachText1: {
    fontSize: 15,
    color: "#565E6C",
    paddingHorizontal: 8,
  },
  paymentDetailEachSucessIcon: {
    borderRadius: 10,
    backgroundColor: "#EEFDF3",
    padding: 8,
    lineHeight: 8,
  },
  ratingExperience: {
    alignItems: "center",
    flex: 1.2,
  },
  backToHome: {
    marginTop: 15,
    paddingHorizontal: 20,
    flex: 1.3,
  },
  buttonBackToHome: {
    backgroundColor: "#FF6026",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 6,
    paddingVertical: 10,
  },
  buttonBackToHomeText: {
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
