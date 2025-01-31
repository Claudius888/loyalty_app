import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { getDimensions } from "../../helpers/util";
import { ModeSwitch, springSpecs } from "./ModeSwitch";

const { SCREEN_WIDTH } = getDimensions();

const _cardBorderRadius = SCREEN_WIDTH * 0.006;
const cardScaleX = (SCREEN_WIDTH * 0.88) / (SCREEN_WIDTH * 0.1);
const cardScaleY = (SCREEN_WIDTH * 0.8) / (SCREEN_WIDTH * 0.1);

export const ShoppingMode = React.memo(() => {
  const isOn = useSharedValue(0);

  const handlePress = () => {
    isOn.value = !isOn.value ? 1 : 0;
  };

  const firstContainerStylez = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      isOn.value,
      [0, 1],
      [_cardBorderRadius, 0],
      Extrapolation.CLAMP
    );
    // const translateX = interpolate(
    //   isOn.value,
    //   [0, 1],
    //   [22.5, 22.5],
    //   Extrapolation.CLAMP
    // );

    const translateY = interpolate(
      isOn.value,
      [0, 1],
      [17, 10],
      Extrapolation.CLAMP
    );

    const scaleX = interpolate(
      isOn.value,
      [0, 1],
      [cardScaleX, 0],
      Extrapolation.CLAMP
    );
    const scaleY = interpolate(
      isOn.value,
      [0, 1],
      [cardScaleY, 0],
      Extrapolation.CLAMP
    );

    const borderRadAnim = withSpring(borderRadius, springSpecs);
    const scaleXAnimation = withSpring(scaleX, springSpecs);
    const scaleYAnimation = withSpring(scaleY, springSpecs);
    // const translateXAnim = withSpring(translateX, springSpecs);
    const translateYAnim = withSpring(translateY, springSpecs);

    return {
      zIndex: 100,
      backgroundColor: "lightblue",
      borderRadius: borderRadAnim,
      transform: [
        {
          scaleX: scaleXAnimation,
        },
        {
          scaleY: scaleYAnimation,
        },
        {
          translateX: SCREEN_WIDTH * 0.05,
        },
        {
          translateY: translateYAnim,
        },
      ],
    };
  });

  const secondContainerStylez = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      isOn.value,
      [0, 1],
      [0, _cardBorderRadius],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      isOn.value,
      [0, 1],
      [0, -(SCREEN_WIDTH * 0.04)], // Translate left as it scales
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      isOn.value,
      [0, 1],
      [10, 17],
      Extrapolation.CLAMP
    );

    const scaleX = interpolate(
      isOn.value,
      [0, 1],
      [0, cardScaleX],
      Extrapolation.CLAMP
    );
    const scaleY = interpolate(
      isOn.value,
      [0, 1],
      [0, cardScaleY],
      Extrapolation.CLAMP
    );

    const borderRadAnim = withSpring(borderRadius, springSpecs);
    const scaleXAnimation = withSpring(scaleX, springSpecs);
    const scaleYAnimation = withSpring(scaleY, springSpecs);
    const translateXAnim = withSpring(translateX, springSpecs);
    const translateYAnim = withSpring(translateY, springSpecs);

    return {
      borderRadius: borderRadAnim,
      transform: [
        {
          scaleX: scaleXAnimation,
        },
        {
          scaleY: scaleYAnimation,
        },
        {
          translateX: translateXAnim,
        },
        {
          translateY: translateYAnim,
        },
      ],
    };
  });

  return (
    <View>
      <ModeSwitch isOn={isOn} handlePress={handlePress} />
      <Animated.View
        style={[styles.card, firstContainerStylez, styles.leftCard]}
      />
      <Animated.View
        style={[styles.card, secondContainerStylez, styles.rightCard]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    height: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.1,
    backgroundColor: "#fff",
    position: "absolute",
  },
  leftCard: {
    top: SCREEN_WIDTH * 0.3,
    // left: SCREEN_WIDTH * 0.05,
  },
  rightCard: {
    top: SCREEN_WIDTH * 0.3,
    right: SCREEN_WIDTH * 0.1,
    // transformOrigin: "top right",
  },
});
