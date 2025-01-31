import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrandSection } from "./HomeElements/BrandSection";
import { RippleRectangle } from "./HomeElements/RippleRectangle";
import { SearchSection } from "./HomeElements/SearchSection";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <ScrollView
        // bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <SearchSection />
        <View style={{ backgroundColor: "#F1F3F8", flex: 1 }}>
          <RippleRectangle />
          <BrandSection />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
