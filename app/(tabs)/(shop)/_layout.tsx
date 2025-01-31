import { Stack } from "expo-router";

export default function ShopLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="shopTab" options={{ headerShown: false }} />
      <Stack.Screen name="shopDetails" options={{ headerShown: false }} />
    </Stack>
  );
}
