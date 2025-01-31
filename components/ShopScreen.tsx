import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchSection } from "./HomeElements/SearchSection";
import ShoppingSection from "./ShopElements/ShoppingSection";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function ShopScreen() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <ScrollView
        // bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <SearchSection title="Shop" subTitle={`Let's earn some Hinti Points`} />
        <View
          style={{ backgroundColor: "#F1F3F8", height: windowHeight * 0.6 }}
        >
          <ShoppingSection />
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
