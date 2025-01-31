import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDimensions } from "../helpers/util";
import { ShopHeader } from "./ShopDetailsElement/ShopHeader";
import { ShoppingMode } from "./ShopDetailsElement/ShoppingMode";

const { SCREEN_WIDTH, SCREEN_HEIGHT } = getDimensions();
export default function ShopDetails() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView
        // bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <ShopHeader
          title="Lacoste"
          subTitle="Shop our extensive range of Fashion and Footwear from leading brands, frangrances loren ipsum loren ipsum"
        />
        <View
          style={{ backgroundColor: "#F1F3F8", height: SCREEN_HEIGHT * 0.5 }}
        >
          <ShoppingMode />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
