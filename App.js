import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import "@expo/metro-runtime";
import COLORS from "./components/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Screen01 from "./screens/Screen01";
import Screen02 from "./screens/Screen02";
import Screen03 from "./screens/Screen03";
import Screen04 from "./screens/Screen04";
import Screen05 from "./screens/Screen05";
import Screen06 from "./screens/Screen06";
import Screen07 from "./screens/Screen07";
import Screen08 from "./screens/Screen08";
import Screen09 from "./screens/Screen09";
import Screen10 from "./screens/Screen10";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Favorite") {
              iconName = focused ? "heart" : "heart-outline";
            } else if (route.name === "Inbox") {
              iconName = focused
                ? "chatbox-ellipses"
                : "chatbox-ellipses-outline";
            } else if (route.name === "Account") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.orange,
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={Screen01} />
        <Tab.Screen name="Search" component={Screen02} />
        <Tab.Screen name="Favorite" component={Screen03} />
        <Tab.Screen name="Inbox" component={Screen04} />
        <Tab.Screen name="Account" component={Screen05} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
