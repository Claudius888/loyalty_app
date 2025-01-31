import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getDimensions, getFontSize } from "../../helpers/util";
import { Marquee } from "./MarqueeAnimation";

const { SCREEN_WIDTH } = getDimensions();
const _iconDimen = SCREEN_WIDTH * 0.12;
const _largeLogo = SCREEN_WIDTH * 0.1;

const BRANDS: { brand: string; image: ImageSourcePropType }[] = [
  {
    brand: "nike",
    image: require(`../../assets/logos/nike-logo.png`),
  },
  {
    brand: "adidas",
    image: require(`../../assets/logos/adidas-logo.png`),
  },
  {
    brand: "uniqlo",
    image: require(`../../assets/logos/uniqlo-logo.png`),
  },
  {
    brand: "hm",
    image: require(`../../assets/logos/hm-logo.png`),
  },
  {
    brand: "apple",
    image: require(`../../assets/logos/apple-logo.png`),
  },
  {
    brand: "asos",
    image: require(`../../assets/logos/asos-logo.png`),
  },
  {
    brand: "lacoste",
    image: require(`../../assets/logos/lacoste-logo.png`),
  },
];
export function BrandSection() {
  return (
    <View style={{ marginTop: 40 }}>
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
          alignSelf: "center",
          marginBottom: 30,
        }}
      >
        <Text style={[styles.mainText, { color: "#92939f" }]}>Brands</Text>
        <Pressable>
          <Text style={styles.mainText}>See all</Text>
        </Pressable>
      </View>
      <Marquee spacing={0} speed={0} frameRate={20}>
        <View style={{ flexDirection: "row" }}>
          {BRANDS.map((item) => {
            return (
              <View
                style={[{ marginHorizontal: 5 }, styles.circleWrapper]}
                key={`${item.brand}-logo`}
              >
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={[
                    styles.circle,
                    item.brand === "uniqlo" && {
                      width: _largeLogo,
                      height: _largeLogo,
                    },
                  ]}
                />
              </View>
            );
          })}
        </View>
      </Marquee>
      <Marquee
        spacing={0}
        speed={0}
        frameRate={20}
        reverse
        style={{ marginVertical: 5 }}
      >
        <View style={{ flexDirection: "row" }}>
          {BRANDS.map((item) => {
            return (
              <View
                style={[{ marginHorizontal: 5 }, styles.circleWrapper]}
                key={`${item.brand}-logo`}
              >
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={[
                    styles.circle,
                    item.brand === "uniqlo" && {
                      width: _largeLogo,
                      height: _largeLogo,
                    },
                  ]}
                />
              </View>
            );
          })}
        </View>
      </Marquee>
      <Marquee spacing={0} speed={0} frameRate={20}>
        <View style={{ flexDirection: "row" }}>
          {BRANDS.map((item) => {
            return (
              <View
                style={[{ marginHorizontal: 5 }, styles.circleWrapper]}
                key={`${item.brand}-logo`}
              >
                <Image
                  source={item.image}
                  // resizeMode="contain"
                  style={[
                    styles.circle,
                    item.brand === "uniqlo" && {
                      width: _largeLogo,
                      height: _largeLogo,
                    },
                  ]}
                />
              </View>
            );
          })}
        </View>
      </Marquee>
    </View>
  );
}

const styles = StyleSheet.create({
  circleWrapper: {
    width: SCREEN_WIDTH * 0.16,
    height: SCREEN_WIDTH * 0.16,
    backgroundColor: "#fff",
    borderRadius: SCREEN_WIDTH * 0.1,
    justifyContent: "center",
    alignItems: "center",
    // padding: SCREEN_WIDTH * 0.03,
  },
  circle: {
    width: _iconDimen,
    height: _iconDimen,
    // borderRadius: SCREEN_WIDTH * 0.1,
    resizeMode: "contain",
  },
  mainText: {
    fontSize: getFontSize(20),
    fontFamily: "Causten-Medium",
  },
});
