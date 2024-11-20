import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import COLORS from "../components/Colors";
export default function Profile({ navigation }) {
  const user = useSelector((state) => state.user.user);
  console.log("ưdsds", user);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              type="fontawesome"
              size={20}
              color="#555"
            />
          </Pressable>
          <Text style={styles.title}>Edit Profile</Text>
          <Text></Text>
        </View>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image source={user.avatar} style={styles.userImage} />
        </View>

        {/* Username */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputWrapper}>
            <Icon name="user" size={18} color="#9CA3AF" style={styles.icon} />
            <TextInput
              value="Magdalena Succrose"
              style={styles.input}
              editable={false} // Makes the input read-only
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email or Phone Number</Text>
          <View style={styles.inputWrapper}>
            <Icon
              name="envelope"
              size={18}
              color="#9CA3AF"
              style={styles.icon}
            />
            <TextInput placeholder="" style={styles.input} />
          </View>
        </View>

        {/* Account Linked With */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account Linked With</Text>
          <View style={styles.inputWrapper}>
            <Image
              source={{ uri: "https://placehold.co/20x20" }}
              style={styles.linkedAccountLogo}
            />
            <Text style={styles.linkedAccountText}>Google</Text>
            <Icon
              name="chevron-right"
              size={18}
              color="#9CA3AF"
              style={styles.chevronIcon}
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 15,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
      color: "#374151",
    paddingVertical:5,
  },
  linkedAccountLogo: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  linkedAccountText: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
  },
  chevronIcon: {
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
