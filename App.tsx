import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UIElements from "./components/UIElements";

const { width, height } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "Recoleta-Medium": require("./assets/fonts/Recoleta-Medium.otf"),
    "Recoleta-Regular": require("./assets/fonts/Recoleta-Regular.otf"),
    "MazzardL-Regular": require("./assets/fonts/MazzardL-Regular.otf"),
    "Causten-Regular": require("./assets/fonts/Causten-Regular.ttf"),
    "Causten-Medium": require("./assets/fonts/Causten-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <SafeAreaProvider style={[styles.container]}>
      <StatusBar style="auto" />
      <View style={{ flex: 1 }}>
        <UIElements />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
