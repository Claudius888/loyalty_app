import { Canvas, Path, Shadow } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { getFontSize } from "../helpers/util";
import { sales_string } from "./SvgString";

// Get current device dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const { width, height } = Dimensions.get("window");
// Reference values for iPhone 14
const REFERENCE_WIDTH = width; // iPhone 14 width
const REFERENCE_HEIGHT = height; // iPhone 14 height
const REFERENCE_SCALE_X = 5.65; // Base scaleX for iPhone 14
const REFERENCE_SCALE_Y = 3.2; // Base scaleY for iPhone 14

// Calculate responsive scaling factors
const responsiveScaleX = (screenWidth / REFERENCE_WIDTH) * REFERENCE_SCALE_X;
const responsiveScaleY = (screenHeight / REFERENCE_HEIGHT) * REFERENCE_SCALE_Y;

const listItem = [
  {
    icons: sales_string.ITEM_1_OFFER,
    title: "Sales",
    subTitle: "Since Last week",
    stat: "230k",
  },
  {
    icons: sales_string.ITEM_2_MAN,
    title: "Customers",
    subTitle: "Since Last week",
    stat: "8.549k",
  },
  {
    icons: sales_string.ITEM_3_PRODUCT,
    title: "Products",
    subTitle: "Since Last week",
    stat: "1.423k",
  },
  {
    icons: sales_string.ITEM_4_CHART,
    title: "Revenue",
    subTitle: "Since Last week",
    stat: "$300k",
  },
];

const FolderShapeWithSkia = ({
  scaleY,
  color,
  scaleRange,
  scaleX,
}: {
  isGestureEnabled?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  scaleRange: { collapse: number; expanded: number };
  position?: { left: number; top: number };
  scaleY: SharedValue<number>;
  scaleX: number;
  color: string;
}) => {
  // Animated style for Canvas container
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      // { translateX: translateX.value },
      { translateY: height * 0.3 * (1 - scaleY.value) },
      // { translateY: translateY.value + (1 - scaleY.value) * height * 0.25 }, // Offset to keep bottom fixed
      { scaleY: scaleY.value },
      // { scaleX: scaleY.value - scaleX },
    ],
  }));

  // List animation based on folder scaleY
  const listAnimatedStyle = useAnimatedStyle(() => ({
    // opacity: interpolate(scaleY.value, [1, 2], [0, 1]),
    transform: [
      {
        translateY: interpolate(
          scaleY.value,
          [scaleRange.collapse, scaleRange?.expanded],
          [40, 25]
        ), // Moves the list up as the folder expands
      },
      {
        scaleY: 1 / scaleY.value,
      },
    ],
  }));

  const listItemStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scaleY.value, [1.5, scaleRange?.expanded], [0, 1]),
    height: interpolate(
      scaleY.value,
      [1.5, scaleRange?.expanded],
      [0, height * 0.09]
    ),
  }));

  return (
    <>
      <Animated.View
        // pointerEvents={isGestureEnabled ? "auto" : "none"}
        style={[styles.animatedContainer, animatedStyle]}
      >
        <Canvas style={[styles.canvas]}>
          <Path
            path={`
                m77.859 24.289h-22.828c-3.0781 0-5.8984-1.9883-7.2812-5.1406-1.3789-3.1484-4.1992-5.1406-7.2812-5.1406h-16.941c-3.0781 0-5.8984 1.9883-7.2812 5.1406l-1.3906 3.1797c-0.57031 1.2891-0.85938 2.7188-0.85938 4.1602v50.211c0 5.1406 3.6406 9.3008 8.1406 9.3008h55.719c4.5 0 8.1406-4.1719 8.1406-9.3008v-43.109c0-5.1406-3.6406-9.3008-8.1406-9.3008z
              `}
            style="fill"
            color={color}
            strokeWidth={1}
            transform={[
              {
                perspective: 1500,
              },
              {
                scaleX: responsiveScaleX,
              },
              {
                scaleY: responsiveScaleY,
              },
              {
                translateX: -12,
              },
              {
                translateY:
                  color === "light pink" ? height * 0.114 : height * 0.112,
              },
            ]}
          >
            {/* Add shadow effect */}
            <Shadow dx={6} dy={6} blur={10} color="rgba(0, 0 , 0, 0.35)" />
            <Shadow dx={-6} dy={-6} blur={10} color="rgba(0, 0 , 0, 0.35)" />
          </Path>
        </Canvas>
        {/* Animated List */}
        <Animated.View style={[styles.listContainer, listAnimatedStyle]}>
          <FlatList
            data={listItem}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Animated.View
                style={[
                  {
                    flexDirection: "row",
                    height: height * 0.09,
                    width: "100%",
                    gap: 4,
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 4,
                  },
                  listItemStyle,
                ]}
                entering={FadeInDown.springify()
                  .damping(30)
                  .mass(5)
                  .stiffness(200)
                  .restDisplacementThreshold(0.1)
                  .restSpeedThreshold(5)}
                exiting={FadeOutDown.springify()
                  .damping(30)
                  .mass(5)
                  .stiffness(200)
                  .restDisplacementThreshold(0.1)
                  .restSpeedThreshold(5)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "27%",
                      height: "70%",
                      backgroundColor: "#000",
                      borderRadius: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SvgXml
                      xml={item.icons}
                      width="60%"
                      height="100%"
                      color={"#fff"}
                    />
                  </View>
                  <View style={{ gap: 1 }}>
                    <Text style={styles.subTitle}>{item.title}</Text>
                    <Text style={styles.regular}>{item.subTitle}</Text>
                  </View>
                </View>
                <Text style={styles.subTitle}>{item.stat}</Text>
              </Animated.View>
            )}
          />
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "lightgreen",
    justifyContent: "space-between",
    alignItems: "center",
  },
  folderContainer: {
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  animatedContainer: {
    overflow: "hidden", // Ensures the animation doesn't spill outside the container
    width: width,
    height: height * 0.7, // Default height
    position: "absolute", // Allow stacking
  },
  listContainer: {
    position: "absolute", // Relative to the animatedContainer
    bottom: "-2%", // Starts appearing in the middle of the folder
    left: "10%", // Padding from the left edge
    right: "10%", // Padding from the right edge
    // opacity: 0, // Animated via Reanimated
    // transform: [{ translateY: 50 }], // Starts offset; animates in
    // backgroundColor: "red",
    // height: height * 0.4,
    // justifyContent: "space-evenly",
  },
  listItem: {
    fontSize: 16,
    color: "#000",
    marginVertical: 2,
  },
  canvas: {
    width: width,
    height: height * 0.7,
    // flex: 1,
  },
  subTitle: {
    fontSize: getFontSize(18),
    fontWeight: "bold",
  },
  regular: {
    fontSize: getFontSize(12),
    fontWeight: "medium",
  },
});

export default FolderShapeWithSkia;
