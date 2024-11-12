import React from "react";
import "@expo/metro-runtime";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "./components/colors";

import Screen01 from "./screens/Screen01";
import Electronics from "./screens/Screen02";
import Screen03 from "./screens/Screen03";
import Screen04 from "./screens/Screen04";
import Screen05 from "./screens/Screen05";
import Screen06 from "./screens/Screen06";
import Screen07 from "./screens/Screen07";
import Screen08 from "./screens/Screen08";
import Screen09 from "./screens/Screen09";
import Screen10 from "./screens/Screen10";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
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
      <Tab.Screen name="Home" component={SignUp} />
      <Tab.Screen name="Search" component={SignIn} />
      <Tab.Screen name="Favorite" component={ForgotPassword} />
      <Tab.Screen name="Inbox" component={Screen04} />
      <Tab.Screen name="Account" component={Screen05} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
