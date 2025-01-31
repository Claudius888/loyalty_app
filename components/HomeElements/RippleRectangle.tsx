import Ionicons from "@expo/vector-icons/Ionicons";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getDimensions, getFontSize } from "../../helpers/util";

const { SCREEN_WIDTH } = getDimensions();

// r.value = withRepeat(withTiming(size * 0.33, { duration: 2500 }), -1);
function GrowCircle() {
  const size = 256;

  // Single shared value to control progress of the animation
  const progress = useSharedValue(0);

  // Derived values for each circle's radius and opacity
  const r1 = useDerivedValue(
    () => size * 0.45 * Math.min(Math.max(progress.value - 0.33, 0), 1)
  ); // Small circle
  const opacity1 = useDerivedValue(() =>
    Math.min(Math.max(progress.value - 0.77, 0), 1)
  ); // Fade-in for small circle

  const r2 = useDerivedValue(
    () => size * 0.7 * Math.min(Math.max(progress.value - 0.33, 0), 1)
  ); // Medium circle
  const opacity2 = useDerivedValue(() =>
    Math.min(Math.max(progress.value - 0.66, 0), 1)
  ); // Fade-in for medium circle

  const r3 = useDerivedValue(
    () => size * 0.9 * Math.min(Math.max(progress.value - 0.33, 0), 1)
  ); // Large circle
  const opacity3 = useDerivedValue(() =>
    Math.min(Math.max(progress.value - 0.66, 0), 1)
  ); // Fade-in for large circle

  // Trigger the animation
  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      // easing: Easing.linear,
    });
  }, [progress]);

  return (
    <Canvas style={{ flex: 1 }}>
      <Group
        blendMode={"softLight"}
        transform={[
          {
            translateX: 50,
          },
        ]}
      >
        {/* Small Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r1}
          color="rgba(255, 255, 255, 0.9)"
          opacity={opacity1}
        />
        {/* Medium Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r2}
          color="rgba(255, 255, 255, 0.7)"
          opacity={opacity2}
        />
        {/* Large Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r3}
          color="rgba(255, 255, 255, 0.5)"
          opacity={opacity3}
        />
      </Group>
    </Canvas>
  );
}

export const RippleRectangle = () => {
  const animation = useRef<LottieView>(null);
  return (
    <View style={styles.rectangle}>
      <View
        style={{
          paddingVertical: 30,
          justifyContent: "space-between",
          paddingLeft: 30,
          position: "absolute",
          zIndex: 100,
          height: SCREEN_WIDTH * 0.5,
        }}
      >
        <Text style={styles.mainText}>Find store {`\n`} nearby</Text>
        <Ionicons
          name="location-outline"
          size={35}
          color="#000"
          style={{ bottom: 0 }}
        />
      </View>
      {/* <GrowCircle /> */}

      <LottieView
        autoPlay
        loop={false}
        duration={2500}
        ref={animation}
        style={{
          height: SCREEN_WIDTH * 0.5,
          width: SCREEN_WIDTH * 0.9,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/home_animation.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.5,
    borderRadius: 20,
    backgroundColor: "lightblue",
    alignSelf: "center",
    marginTop: 40,
    flexDirection: "row",
    overflow: "hidden",
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  mainText: {
    fontSize: getFontSize(21),
    fontFamily: "Causten-Medium",
  },
});
