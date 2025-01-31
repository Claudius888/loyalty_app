import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { getDimensions, getFontSize } from "../../helpers/util";

const { SCREEN_WIDTH } = getDimensions();
const _slideWidth = SCREEN_WIDTH * 0.43;

export const springSpecs = {
  mass: 1,
  damping: 20,
  stiffness: 100,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

const CustomAnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

export function ModeSwitch({
  isOn,
  handlePress,
}: {
  isOn: SharedValue<number>;
  handlePress: () => void;
}) {
  const highlighterAnimatedStyle = useAnimatedStyle(() => {
    const position = interpolate(isOn.value, [0, 1], [10, _slideWidth + 20]);
    const leftBorderRadius = interpolate(isOn.value, [0, 1], [20, 5]);
    const rightBorderRadius = interpolate(isOn.value, [0, 1], [5, 20]);

    const positionAnimation = withSpring(position, springSpecs);
    const leftBorderAnimation = withSpring(leftBorderRadius, springSpecs);
    const rightBorderAnimation = withSpring(rightBorderRadius, springSpecs);

    return {
      left: positionAnimation,
      borderTopLeftRadius: leftBorderAnimation,
      borderBottomLeftRadius: leftBorderAnimation,
      borderTopRightRadius: rightBorderAnimation,
      borderBottomRightRadius: rightBorderAnimation,
      // borderRadius: height.value / 2,
    };
  });

  const leftTextStyle = useAnimatedStyle(() => {
    const colorVal = interpolateColor(
      isOn.value,
      [0, 0.2, 1],
      ["#fff", "#000", "#000"]
    );

    const colAnimation = withTiming(colorVal, { duration: 400 });

    return {
      color: colAnimation,
    };
  });

  const rightTextStyle = useAnimatedStyle(() => {
    const colorVal = interpolateColor(
      isOn.value,
      [0, 0.8, 1],
      ["#000", "#000", "#fff"]
    );
    const colAnimation = withTiming(colorVal, { duration: 400 });

    return {
      color: colAnimation,
    };
  });

  return (
    <View
      style={{
        flexDirection: "row",
        width: SCREEN_WIDTH * 0.95,
        height: SCREEN_WIDTH * 0.18,
        backgroundColor: "#fff",
        borderRadius: SCREEN_WIDTH * 0.09,
        paddingLeft: "3%",
        paddingRight: "4%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        alignSelf: "center",
      }}
    >
      <Animated.View style={[styles.highlighter, highlighterAnimatedStyle]} />
      <Pressable
        style={{
          flexDirection: "row",
          flex: 1,
          height: "70%",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
        onPress={handlePress}
      >
        <CustomAnimatedIonicons
          name="globe-outline"
          size={24}
          style={leftTextStyle}
        />
        <Animated.Text style={[styles.mainText, leftTextStyle]}>
          Online
        </Animated.Text>
      </Pressable>
      <Pressable
        onPress={handlePress}
        style={{
          flexDirection: "row",
          flex: 1,
          height: "70%",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <CustomAnimatedIonicons
          name="basket-outline"
          size={24}
          style={rightTextStyle}
        />
        <Animated.Text style={[styles.mainText, rightTextStyle]}>
          In store
        </Animated.Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  highlighter: {
    position: "absolute",
    backgroundColor: "#017750",
    height: SCREEN_WIDTH * 0.13,
    width: _slideWidth,
    alignItems: "center",
    justifyContent: "center",
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
