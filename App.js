import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "./components/colors";
import Home from "./screens/Home";
import Electronics from "./screens/Electronics";
import FreshFruits from "./screens/FreshFruits";
import Screen04 from "./screens/Screen04";
import Screen05 from "./screens/Screen05";
import Screen06 from "./screens/Screen06";
import Screen07 from "./screens/Screen07";
import Screen08 from "./screens/Screen08";
import Screen09 from "./screens/Screen09";
import Screen10 from "./screens/Screen10";
import Test from "./screens/Test";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Cấu hình BottomTabNavigator
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Electronics} />
      <Tab.Screen name="Favorite" component={FreshFruits} />
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
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Electronics" component={Electronics} />
        <Stack.Screen name="FreshFruits" component={FreshFruits} />
        <Stack.Screen name="Screen04" component={Screen04} />
        <Stack.Screen name="Screen05" component={Screen05} />
        <Stack.Screen name="Screen06" component={Screen06} />
        <Stack.Screen name="Screen07" component={Screen07} />
        <Stack.Screen name="Screen08" component={Screen08} />
        <Stack.Screen name="Screen09" component={Screen09} />
        <Stack.Screen name="Screen10" component={Screen10} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
