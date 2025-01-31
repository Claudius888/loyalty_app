import { useRouter } from "expo-router";
import React from "react";
import { ImageSourcePropType, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { getDimensions, getFontSize } from "../../helpers/util";
import SectionHeader from "./SectionHeader";

export type listDataItems = {
  brand: string;
  promo: string;
  image: ImageSourcePropType;
  mode: "online" | "in-strore";
};

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
];

const { SCREEN_WIDTH } = getDimensions();
const _slideWidth = SCREEN_WIDTH * 0.42;
const _spacing = 5;

function Card({
  product,
  scrollX,
  index,
}: {
  product: listDataItems;
  scrollX: SharedValue<number>;
  index: number;
}) {
  // useDerivedValue(() => {
  //   // `runOnJS` allows worklets to call JavaScript functions
  //   "worklet";
  //   console.log(`SharedValue (worklet): ${testValue.value} /// index ${index}`);
  // });

  const router = useRouter();

  const containerStylez = useAnimatedStyle(() => {
    return {
      borderBottomEndRadius: interpolate(
        scrollX.value,
        [index - 2, index - 1, index, index + 1],
        [20, 5, 5, 20],
        Extrapolation.EXTEND
      ),
      borderBottomStartRadius: interpolate(
        scrollX.value,
        [index - 2, index - 1, index, index + 1],
        [20, 5, 5, 20],
        Extrapolation.EXTEND
      ),
      transform: [
        {
          scaleY: interpolate(
            scrollX.value,
            [index - 2, index - 1, index, index + 1],
            [1, 3.7, 3.7, 1],
            Extrapolation.EXTEND
          ),
        },
      ],
    };
  });

  const innerTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 2, index - 1, index, index + 1],
        [0, 1, 1, 0],
        Extrapolation.EXTEND
      ),
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 2, index - 1, index, index + 1],
            [-20, 0, 0, -20],
            Extrapolation.EXTEND
          ),
        },
      ],
    };
  });

  return (
    <Pressable
      style={styles.boxWrapper}
      onPress={() => router.navigate("/shopDetails")}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            zIndex: -100,
            height: SCREEN_WIDTH * 0.25,
            width: _slideWidth,
            backgroundColor: "#fff",
          },
          containerStylez,
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
        {/* <View style={[{ position: "absolute", right: 3, top: 3 }]}>
          <DiamondButton />
        </View> */}
        <Animated.Image
          source={product.image}
          resizeMode="contain"
          style={[styles.imageBox, innerTextStyle]}
        />
        <Animated.Text style={[styles.mainText, innerTextStyle]}>
          {product.brand}
        </Animated.Text>
        <Animated.Text style={[styles.regular, innerTextStyle]}>
          {product.promo}
        </Animated.Text>
      </View>
    </Pressable>
  );
}

export default function HorizontalList() {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_slideWidth + _spacing);
  });

  return (
    <View style={styles.mainContainer}>
      <SectionHeader title="Featured" />
      <Animated.FlatList
        data={_featuredList}
        horizontal
        contentContainerStyle={styles.listContainer}
        snapToInterval={_slideWidth + _spacing}
        decelerationRate={"fast"}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return <Card product={item} scrollX={scrollX} index={index} />;
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 30,
  },
  listContainer: {
    marginLeft: SCREEN_WIDTH * 0.05,
  },
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
