import React from "react";
import { StyleSheet, View } from "react-native";
import { getDimensions } from "../../helpers/util";
import { listDataItems } from "./HorizontalList";
import SectionHeader from "./SectionHeader";
import ShopCard from "./ShopCard";

const _featuredList: listDataItems[] = [
  {
    brand: "Asos",
    promo: "Upto 8 points per $1",
    image: require("../../assets/logos/asos-logo.png"),
    mode: "online",
  },
  {
    brand: "Adidas",
    promo: "Upto 5 points per $10",
    image: require("../../assets/logos/adidas-logo.png"),
    mode: "online",
  },
  {
    brand: "Starbucks",
    promo: "Upto 2 points per $20",
    image: require("../../assets/starbucks.png"),
    mode: "online",
  },
  {
    brand: "Nike",
    promo: "Upto 8 points per $25",
    image: require("../../assets/logos/nike-logo.png"),
    mode: "online",
  },
  {
    brand: "Uniqlo",
    promo: "Upto 15 points per $15",
    image: require("../../assets/logos/uniqlo-logo.png"),
    mode: "online",
  },
  {
    brand: "H&M",
    promo: "Upto 15 points per $10",
    image: require("../../assets/logos/hm-logo.png"),
    mode: "online",
  },
  {
    brand: "Lacoste",
    promo: "Upto 15 points per $15",
    image: require("../../assets/logos/lacoste-logo.png"),
    mode: "online",
  },
];

const { SCREEN_WIDTH } = getDimensions();

export default function ShopBrand() {
  return (
    <View style={styles.container}>
      <SectionHeader title="Brand" />
      <View style={styles.listWrapper}>
        {_featuredList.map((item) => {
          return (
            <ShopCard
              product={item}
              key={`${item.brand}-key`}
              containerStyle={{ marginBottom: 10 }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  listWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: SCREEN_WIDTH,
    height: "auto",
  },
});
