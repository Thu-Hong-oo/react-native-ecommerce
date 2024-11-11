// src/components/AssetExample.js
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import COLORS from "../components/colors";
import { useState } from "react";

export default function AssetExample({ navigation }) {
  const [name, setName] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1.5 }}>
          <Image source={require("../assets/imgs/bannerHeadphone.png")} />
        </View>
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.manage}> MANAGE YOUR {"\n"}TASK</Text>
          <View style={styles.containerInput}>
            <Icon name="mail" type="antdesign" color="gray" />
            <TextInput
              placeholder="Enter your mail"
              placeholderTextColor="gray"
              style={{ marginHorizontal: 10, width: "100%" }}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("Screen07");
            }}
            style={styles.pressable}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              GET STARTED
            </Text>
            <Icon name="arrowright" type="antdesign" color="white" />
          </Pressable>
        </View>
        <Image source={require("../assets/imgs/bannerHeadphone.png")} />
        <Image source={require("../assets/imgs/bannerHeadphone.png")} />
        <Image source={require("../assets/imgs/bannerHeadphone.png")} />
        <Image source={require("../assets/imgs/bannerHeadphone.png")} />
        <Image source={require("../assets/imgs/bannerHeadphone.png")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    backgroundColor: COLORS.button,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    width: "60%",
    borderRadius: 10,
  },
  containerInput: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    paddingVertical: 5,
    marginTop: 30,
    marginBottom: 50,
  },
  manage: {
    textAlign: "center",
    color: COLORS.gray,
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
