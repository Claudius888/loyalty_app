import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { DiamondIcon } from "./DiamondIcon";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DiamondButton({
  containerStyles,
}: {
  containerStyles?: StyleProp<ViewStyle>;
}) {
  return (
    <AnimatedPressable style={[styles.circle, containerStyles]}>
      <DiamondIcon height={30} width={30} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "#3952ea",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
