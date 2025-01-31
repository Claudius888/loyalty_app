import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { getDimensions, getFontSize } from "../../helpers/util";
import DiamondButton from "../ShopDetailsElement/DiamondButton";
import { listDataItems } from "./HorizontalList";

const { SCREEN_WIDTH } = getDimensions();
const _slideWidth = SCREEN_WIDTH * 0.42;
const _darkGreen = "#016b45";

export default function ShopCard({
  product,
  containerStyle,
}: {
  product: listDataItems;
  containerStyle: StyleProp<ViewStyle>;
}) {
  const router = useRouter();

  return (
    <Pressable
      style={[styles.boxWrapper, containerStyle]}
      onPress={() => router.navigate("/shopDetails")}
    >
      <View
        style={[
          {
            position: "absolute",
            zIndex: -100,
            height: SCREEN_WIDTH * 0.5,
            width: _slideWidth,
            backgroundColor: "#fff",
          },
        ]}
      />
      <View
        style={[
          {
            height: SCREEN_WIDTH * 0.5,
            width: _slideWidth - 5,
            paddingTop: 20,
            paddingLeft: 20,
          },
        ]}
      >
        <View style={[{ position: "absolute", right: 3, top: 3 }]}>
          <DiamondButton />
        </View>
        <Image
          source={product.image}
          resizeMode="contain"
          style={[styles.imageBox]}
        />
        <Text style={[styles.mainText]}>{product.brand}</Text>
        <Text style={[styles.regular]}>{product.promo}</Text>
        <View style={{ flexDirection: "row", marginTop: 10, gap: 3 }}>
          <View style={styles.circle}>
            <Ionicons name="globe-outline" size={18} color={"white"} />
          </View>
          <View style={styles.circle}>
            <Ionicons name="wallet-outline" size={18} color={"white"} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boxWrapper: {
    height: SCREEN_WIDTH * 0.5,
    width: _slideWidth,
    marginHorizontal: 5,
    overflow: "hidden",
    borderRadius: 20,
  },
  box: {
    height: SCREEN_WIDTH * 0.25,
    width: _slideWidth,
    backgroundColor: "pink",
    paddingTop: 20,
    paddingLeft: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  imageBox: {
    height: "40%",
    width: "40%",
    marginBottom: 20,
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: _darkGreen,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: getFontSize(20),
    fontFamily: "Causten-Medium",
  },
  regular: {
    fontSize: getFontSize(14),
    fontFamily: "Causten-Regular",
    color: "#555555",
  },
});
