import { Dimensions, StyleSheet, View } from "react-native";
import UIElements from "../components/UIElements";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1 }}>
        <UIElements />
        {/* <HomeScreen /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
