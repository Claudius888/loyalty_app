import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Pressable, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  LinearTransition,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const _activeDot = "#3048ea";
const _inactiveDot = "#aaa";

const _inactiveWidth = 10;
const _activeWidth = 30;
const _darkBlue = "#3048ea";
const _spacing = 10;

const { height } = Dimensions.get("window");

function Dot({
  index,
  animation,
  selectedIndex,
}: {
  index: number;
  animation: SharedValue<number>;
  selectedIndex: number;
}) {
  const stylez = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animation.value,
      [index - 1, index, index + 1],
      [_inactiveDot, _activeDot, _inactiveDot]
    );

    const width = interpolate(
      animation.value,
      [index - 1, index, index + 1],
      [_inactiveWidth, _activeWidth, _inactiveWidth],
      Extrapolation.CLAMP
    );

    // TranslateX for left-to-right expansion
    const translateX = interpolate(
      animation.value,
      [index - 1, index, index + 1],
      [0, (_activeWidth - _inactiveWidth) / 2, (width - _inactiveWidth) / 2],
      Extrapolation.CLAMP
    );

    const spacing =
      index + 1 === 1 && Math.round(animation.value) === 0
        ? _spacing + 5
        : index + 1 === Math.round(animation.value)
        ? // ? _spacing + additionalSpacing
          -10
        : _spacing;

    // Border radius for smooth appearance
    const borderRadius = width / 2;

    return {
      backgroundColor,
      width,
      borderRadius,
      transform: [{ translateX }],
      marginRight: spacing, // Maintain consistent spacing
      // marginLeft: spacing,
    };
  });
  return (
    <Animated.View
      style={[
        stylez,
        {
          height: _inactiveWidth,
        },
      ]}
      layout={LinearTransition.springify().damping(80).stiffness(200)}
    />
  );
}

export default function OnboardingControls({
  total,
  selectedIndex,
  onIndexChange,
  animation,
}: {
  total: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  animation: SharedValue<number>;
}) {
  const router = useRouter();

  return (
    <View
      style={{
        height: "30%",
        width: "100%",
        // backgroundColor: "lightblue",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          // gap: 5,
          flexDirection: "row",
          width: "35%",
          justifyContent: "space-evenly",
          // backgroundColor: "red",
        }}
      >
        {[...Array(total).keys()].map((index) => (
          <Dot
            key={`item-${index}`}
            index={index}
            animation={animation}
            selectedIndex={selectedIndex}
          />
        ))}
      </View>
      <Pressable
        style={{
          height: height * 0.07,
          width: height * 0.07,
          borderRadius: height * 0.07,
          backgroundColor: _activeDot,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          // return router.navigate("/(tabs)/(shop)/shopDetails");
          if (selectedIndex + 1 === total) {
            // return onIndexChange(0);
            return router.navigate("/(tabs)/discover");
          }
          onIndexChange(selectedIndex + 1);
        }}
      >
        <Ionicons name="arrow-forward" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}
