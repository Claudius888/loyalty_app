import {
  Canvas,
  Circle,
  Group,
  Image,
  Mask,
  RoundedRect,
  interpolate,
  useImage,
} from "@shopify/react-native-skia";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate as Reinterpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { getFontSize } from "../../helpers/util";
import RoundBtn, { IconType } from "../HomeElements/RoundBtn";
import DiamondButton from "./DiamondButton";
import { springSpecs } from "./ModeSwitch";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const _defaultTitle = `Good morning, \n Thomas`;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const _initialWidth = windowWidth * 0.25;
const _canvasWidth = windowWidth * 0.9;
const _canvasHeight = windowWidth * 0.95;
const _size = windowWidth * 0.15;
const _cx = _canvasWidth / 2;
const _cy = _canvasHeight / 2;
const _imageSize = windowWidth * 0.21;
const _imageX = _cx - _imageSize / 2;
const _imageY = _cy - _imageSize / 2;

const ImageReveal = React.memo(() => {
  const image = useImage(require("../../assets/shop_inside.jpg"))!;
  const logoImage = useImage(require("../../assets/logos/lacoste-logo.png"))!;
  const revealRect = useSharedValue(0);

  useEffect(() => {
    revealRect.value = withTiming(1, { duration: 2000 });
  }, []);

  const revealAnimation = useDerivedValue(() => {
    return [
      {
        translateX: interpolate(
          revealRect.value,
          [0, 1],
          [(windowWidth - _initialWidth) / 2, windowWidth * 1.3]
        ),
      },
      {
        scaleX: interpolate(revealRect.value, [0, 1], [1, 3.75]),
      },
      {
        scaleY: interpolate(revealRect.value, [0, 1], [0, 3.6]),
      },
    ];
  }, [revealRect]);

  const borderRadius = useDerivedValue(() => {
    return interpolate(revealRect.value, [0, 1], [0, 5]);
  }, [revealRect]);

  const logoTransform = useDerivedValue(() => {
    return [
      {
        scaleX: interpolate(revealRect.value, [0, 0.5, 0.9, 1], [0, 0, 1.1, 1]),
      },
      {
        scaleY: interpolate(revealRect.value, [0, 0.5, 0.9, 1], [0, 0, 1.1, 1]),
      },
    ];
  });

  return (
    <Canvas style={{ width: windowWidth * 0.95, height: windowWidth * 0.95 }}>
      <Mask
        mode="luminance"
        mask={
          <Group>
            <RoundedRect
              origin={{ x: 0, y: 0 }}
              x={0}
              y={0}
              width={windowWidth * 0.95}
              height={windowWidth * 0.9}
              color="black"
              r={0}
            />
            <RoundedRect
              origin={{ x: (windowWidth * 0.95) / 2, y: 0 }}
              // x={(windowWidth - _initialWidth) / 2}
              x={0}
              y={0}
              width={_initialWidth}
              height={_initialWidth}
              r={borderRadius ?? 0}
              // r={0}
              color="white"
              transform={revealAnimation}
            ></RoundedRect>
          </Group>
        }
      >
        <Image
          fit="cover"
          x={0}
          y={0}
          image={image}
          height={windowWidth * 0.9}
          width={windowWidth * 0.95}
        />
      </Mask>
      <Group origin={{ x: _cx, y: _cy }} transform={logoTransform}>
        <Circle cx={_cx} cy={_cy} r={_size} color="white" />
        <Image
          fit={"contain"}
          x={_imageX}
          y={_imageY}
          image={logoImage}
          height={_imageSize}
          width={_imageSize}
        />
      </Group>
    </Canvas>
  );
});

const AnimatedTopSection = React.memo(() => {
  const router = useRouter();

  const animateFog = useSharedValue(0);

  useEffect(() => {
    animateFog.value = withDelay(1000, withSpring(1, { ...springSpecs }));
  });

  const animatedFog = useAnimatedStyle(() => {
    return {
      zIndex: -50,
      opacity: Reinterpolate(animateFog.value, [0.5, 1], [0.2, 0.8]),
      transform: [
        {
          scaleX: Reinterpolate(animateFog.value, [0, 1], [0, 1]),
        },
      ],
    };
  });

  const animateBckBtn = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: Reinterpolate(animateFog.value, [0.7, 1], [-50, 0]),
        },
      ],
    };
  });
  const animatedFavBtn = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: Reinterpolate(animateFog.value, [0.7, 1], [50, 0]),
        },
      ],
    };
  });

  return (
    <>
      <RoundBtn
        icon={{ type: IconType.Feather, name: "arrow-left" }}
        containerStyle={[
          {
            marginTop: 15,
            marginLeft: 10,
          },
          animateBckBtn,
        ]}
        buttonShadow={false}
        onPress={() => router.back()}
      />
      <AnimatedLinearGradient
        // Background Linear Gradient
        colors={["rgba(255,255,255,1)", "transparent"]}
        // colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={[
          {
            position: "absolute",
            // zIndex: -50,
            height: windowWidth * 0.2,
            width: windowWidth,
            top: 0,
            left: -20,
          },
          animatedFog,
        ]}
      />
      <DiamondButton
        containerStyles={[
          { top: 15, position: "absolute", right: 5 },
          animatedFavBtn,
        ]}
      />
    </>
  );
});

export const ShopHeader = ({
  title = _defaultTitle,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <View style={styles.circle} /> */}
        <AnimatedTopSection />
        <View style={styles.shopPic}>
          <ImageReveal />
        </View>
      </View>
      <View
        style={[
          subTitle && {
            height: "60%",
            justifyContent: "space-between",
            marginBottom: 20,
          },
        ]}
      >
        <View>
          <Text style={styles.subTitle}>{title}</Text>
          {subTitle && <Text style={styles.regular}>{subTitle}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 40,
    width: windowWidth,
    height: windowWidth * 1.3,
    justifyContent: "space-between",
    elevation: 1500,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: windowWidth * 0.9,
  },
  shopPic: {
    height: windowWidth * 0.9,
    maxWidth: windowWidth * 0.96,
    position: "absolute",
    top: 0,
    left: -3,
    zIndex: -100,
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 25,
    marginTop: 15,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    fontSize: getFontSize(28),
    fontFamily: "Recoleta-Medium",
    // fontWeight: "semibold",
  },
  regular: {
    fontSize: getFontSize(17),
    fontFamily: "Causten-Regular",
    color: "#555555",
  },
  mediumText: {
    fontSize: getFontSize(18),
    fontFamily: "Causten-Medium",
  },
});
