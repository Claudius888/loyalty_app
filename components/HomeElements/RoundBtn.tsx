import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { FadeInLeft, SlideInLeft } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export enum IconType {
  Feather,
  FontAwesome,
  Ionicons,
}

export enum EnterAnimType {
  SlideInLeft,
  FadeInLeft,
}

const layoutFn = {
  [EnterAnimType.SlideInLeft]: SlideInLeft.stiffness(200).damping(80),
  [EnterAnimType.FadeInLeft]: FadeInLeft.stiffness(200).damping(80),
};

type RoundBtnProps = {
  icon:
    | { type: IconType.Feather; name: keyof typeof Feather.glyphMap }
    | { type: IconType.FontAwesome; name: keyof typeof FontAwesome.glyphMap }
    | { type: IconType.Ionicons; name: keyof typeof Ionicons.glyphMap };
  buttonShadow?: boolean;
  iconSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  touchDisabled?: false;
  iconColor?: string;
  onPress?: () => void;
  // EnteringFn?: EnterAnimType;
};

export default function RoundBtn({
  icon,
  iconSize = 20,
  containerStyle,
  touchDisabled,
  iconColor = "#000",
  buttonShadow,
  onPress,
}: // EnteringFn,
RoundBtnProps) {
  return (
    <AnimatedPressable
      style={[styles.circle, containerStyle, buttonShadow && styles.shadow]}
      disabled={touchDisabled}
      onPress={onPress}
      // entering={EnteringFn ? layoutFn[EnteringFn] : undefined}
      // entering={EnteringFn ? layoutFn[EnteringFn] : undefined}
    >
      {icon.type === IconType.FontAwesome && (
        <FontAwesome name={icon.name} size={iconSize} color={iconColor} />
      )}
      {icon.type === IconType.Feather && (
        <Feather name={icon.name} size={iconSize} color={iconColor} />
      )}
      {icon.type === IconType.Ionicons && (
        <Ionicons name={icon.name} size={iconSize} color={iconColor} />
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
