import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="compass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(shop)"
        options={{
          title: "Shop",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="basket-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="redeem"
        options={{
          title: "Redeem",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="ticket" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
