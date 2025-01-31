import Ionicons from "@expo/vector-icons/Ionicons";
import { default as React, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  AnimatedStyle,
  Easing,
  Extrapolation,
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FadeOutRight,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { getFontSize } from "../helpers/util";
import SVGPathAnimation from "./OnBoardingBase";
import OnboardingControls from "./OnboardingControls";
import OnBoardingFourSVG from "./OnBoardingFourSVG";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  leftTag: {
    top: "20%",
    left: "10%",
    height: "13%",
    width: "33%",
    borderRadius: "20%",
    transform: [{ rotate: "30deg" }],
  },
  screenTwoleftTag: {
    top: "20%",
    left: "10%",
  },
  leftTagText: {
    fontSize: 16,
  },

  rightTag: {
    top: "25%",
    right: "7%",
    height: "10%",
    width: "30%",
    borderRadius: "17%",
    transform: [{ rotate: "-35deg" }],
  },
  baadgeScreen2: {
    height: "10%",
    width: "25%",
    borderRadius: "20%",
  },
  screenTwoRightTag: {
    top: "25%",
    right: "7%",
  },
  rightTagText: {
    fontSize: 14,
  },
  bottomTag: {
    bottom: "10%",
    left: "25%",
    height: "13%",
    width: "40%",
    borderRadius: "17%",
    transform: [{ rotate: "-30deg" }],
  },
  screenTwobottomTag: {
    bottom: "-5%",
    left: "25%",
  },
  bottomTagText: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: getFontSize(22),
    fontFamily: "Recoleta-Medium",
    // fontWeight: "semibold",
  },
  regular: {
    fontSize: getFontSize(16),
    fontFamily: "Causten-Regular",
    // fontWeight: "medium",
  },
  badgeText: {
    fontSize: getFontSize(12),
    fontFamily: "Causten-Regular",
  },
  mediumText: {
    fontSize: getFontSize(16),
    fontFamily: "Causten-Medium",
  },
  giftCard: {
    fontSize: getFontSize(32),
    color: "#000",
    fontFamily: "Causten-Medium",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 16,
  },
});

const _screen13Color = "#13815A";
const _screen2color = "#95be7c";

const _darkGreen = "#016b45";
const _lightPink = "#f3adc7";
const _lightBlue = "#aedef4";
const _darkBlue = "#3048ea";

const splash_text = {
  0: {
    title: "Shop and Earn Points",
    subText: `Earn points by following a link and \npurchasing online or by registering your \npayment card and choosing in store offers`,
  },
  1: {
    title: `Exchange Swapi Points for \nOffers, Gift Cards and more`,
    subText: `Choose to swap your points from a \nmarketplace of offers, gift cards or \nproducts to gain real value from your shop`,
  },
  2: {
    title: "Swap your \npoints for Bitcoin",
    subText: `Exchange your points for the worlds \nmost popular digital currency and \nenter the world of crypto`,
  },
  3: {
    title: "Hinti Wallet",
    subText: `Lose all the plastic and store all your loyalty \nand gift cards in one handy wallet to gain \nmaximum value from shopping trips.`,
  },
  // 4: {
  //   title: "Hinti Wallet",
  //   subText: `Lose all the plastic and store all your loyalty \nand gift cards in one handy wallet to gain \nmaximum value from shopping trips.`,
  // },
};

const Points_View = ({
  points,
  location,
  stylez,
}: {
  points: string;
  location: "leftTag" | "bottomTag" | "rightTag";
  stylez: AnimatedStyle;
}) => {
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          flexDirection: "row",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,

          // ...size
        },
        styles[location],
        stylez,
      ]}
    >
      <Ionicons name="diamond-outline" size={24} color="#E5497A" />
      <Text
        style={[
          // { fontSize: 20, color: "#000", fontWeight: "400" },
          styles.badgeText,
          styles[`${location}Text`],
        ]}
      >
        +{" "}
        <Text
          style={[
            {
              fontSize: 20,
              color: "#000",
              // fontWeight: "600",
              fontFamily: "Causten-Medium",
            },
            styles[`${location}Text`],
          ]}
        >
          {points}
        </Text>{" "}
        points
      </Text>
    </Animated.View>
  );
};

const ScreenTwoPointsView = ({
  points,
  location,
  index,
}: {
  points: string;
  location: "screenTwoleftTag" | "screenTwobottomTag" | "screenTwoRightTag";
  index: number;
}) => {
  const spin = useSharedValue(0);

  useEffect(() => {
    spin.value = withDelay(index * 500, withSpring(1, { duration: 500 }));
  }, []);

  // const frontStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     {
  //       rotate: `${interpolate(spin.value, [0, 1], [0, 360])}deg`,
  //     },
  //   ],
  //   opacity: interpolate(spin.value, [0.5, 0.7, 1], [0.5, 0.7, 1]),
  // }));
  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: spin.value,
      },
      {
        rotate: `${interpolate(
          spin.value,
          [0.1, 0.3, 0.6, 1],
          [-20, 20, 10, 0],
          Extrapolation.EXTEND
        )}deg`,
      },
    ],
    opacity: interpolate(
      spin.value,
      [0.3, 0.6, 1],
      [0.5, 0.8, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <Animated.View
      style={[
        {
          zIndex: 10,
          position: "absolute",
          flexDirection: "row",
          backgroundColor: _screen13Color,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          // ...size
        },
        styles[location],
        styles.baadgeScreen2,
        frontStyle,
        // stylez,
      ]}
    >
      <Text
        style={[
          styles.regular,
          {
            color: "#fff",
            fontWeight: "400",
          },
          // styles[`${location}Text`],
        ]}
      >
        {points} Points
      </Text>
    </Animated.View>
  );
};

function OnBoardingScreen1() {
  const scale1 = useSharedValue(0);
  const scale2 = useSharedValue(0);
  const scale3 = useSharedValue(0);

  React.useEffect(() => {
    scale1.value = withDelay(
      1000,
      withTiming(1, { duration: 800, easing: Easing.elastic(1.5) })
    );
    scale2.value = withDelay(
      1300,
      withTiming(1, { duration: 700, easing: Easing.elastic(1.5) })
    );
    scale3.value = withDelay(
      1800,
      withTiming(1, { duration: 700, easing: Easing.elastic(1.5) })
    );
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale1.value,
      },
      {
        rotate: `${interpolate(
          scale1.value,
          [0.1, 0.3, 0.6, 1],
          [0, 20, 40, 30],
          Extrapolation.EXTEND
        )}deg`,
      },
    ],
    opacity: interpolate(
      scale1.value,
      [0.3, 0.6, 1],
      [0.5, 0.8, 1],
      Extrapolation.CLAMP
    ),
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale2.value,
      },
      {
        rotate: `${interpolate(
          scale2.value,
          [0.1, 0.3, 0.6, 1],
          [0, -20, -40, -35],
          Extrapolation.EXTEND
        )}deg`,
      },
    ],
    opacity: interpolate(
      scale2.value,
      [0.3, 0.6, 1],
      [0.5, 0.8, 1],
      Extrapolation.CLAMP
    ),
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale3.value,
      },
      {
        rotate: `${interpolate(
          scale3.value,
          [0.1, 0.3, 0.6, 1],
          [0, -20, -40, -30],
          Extrapolation.EXTEND
        )}deg`,
      },
    ],
    opacity: interpolate(
      scale3.value,
      [0.3, 0.6, 1],
      [0.5, 0.8, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "50%",
        // backgroundColor: "red",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          height: "13%",
          backgroundColor: "#fff",
          borderRadius: "8%",
          paddingLeft: "3%",
          paddingRight: "4%",
          // paddingTop: "0.5%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "45%",
          left: "10%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#05714A",
            flex: 1,
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <Ionicons name="globe-outline" size={24} color="white" />
          <Text style={{ fontSize: 20, color: "#fff", fontWeight: "600" }}>
            Online
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            flex: 1,
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Ionicons name="basket-outline" size={24} color="black" />
          <Text style={{ fontSize: 20, color: "#000", fontWeight: "600" }}>
            In Store
          </Text>
        </View>
      </View>
      <Points_View points="39" location="leftTag" stylez={animatedStyle1} />
      <Points_View points="120" location="bottomTag" stylez={animatedStyle2} />
      <Points_View points="80" location="rightTag" stylez={animatedStyle3} />
    </View>
  );
}

function OnBoardingScreen2() {
  return (
    <View
      style={[
        {
          position: "absolute",
          width: "100%",
          height: "50%",
          // backgroundColor: "red",
        },
        styles.boxShadow,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          height: "20%",
          backgroundColor: "rgba(229, 248, 255, 1)",
          borderRadius: "12%",
          paddingLeft: "0.8%",
          paddingRight: "4%",
          // paddingTop: "0.5%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "45%",
          left: "10%",
          boxShadow: "5",
        }}
      >
        <Image
          style={{ width: "30%", height: "70%" }}
          source={require("../assets/starbucks.png")}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            height: "70%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.giftCard}>Gift Card</Text>
          <Text style={{ fontSize: 32, color: "#000", fontWeight: "500" }}>
            £14
          </Text>
        </View>
      </View>
      {/* <Animated.View>
        <ScreenTwoPointsView
          points="3000"
          location="screenTwoleftTag"
          index={0.7}
        />
        <ScreenTwoPointsView
          points="1500"
          location="screenTwobottomTag"
          index={2.2}
        />
        <ScreenTwoPointsView
          points="850"
          location="screenTwoRightTag"
          index={2.7}
        />
      </Animated.View> */}
    </View>
  );
}

function FabIcon({
  disabled,
  scale = 0.05,
  bgColor = _screen2color,
  iconSize = 16,
  style,
}: {
  disabled: boolean;
  scale?: number;
  bgColor?: string;
  iconSize?: number;
  style: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      style={[
        style,
        {
          height: height * scale,
          width: height * scale,
          borderRadius: height * scale,
          backgroundColor: bgColor,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      disabled={disabled}
      onPress={() => {}}
    >
      <Ionicons name="arrow-forward" size={iconSize} color="#fff" />
    </Pressable>
  );
}

function OnBoardingScreen3() {
  return (
    <View
      style={{
        position: "absolute",
        top: "22%",
        left: "12.5%",
        height: "20%",
        width: "75%",
        borderRadius: "5%",
        backgroundColor: _screen2color,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: "10%",
          paddingTop: "7.5%",
          gap: "4%",
        }}
      >
        <View
          style={[
            {
              flex: 1,
              backgroundColor: "#c2dbb5",
              minHeight: "40%",
              borderRadius: "7%",
            },
            styles.center,
          ]}
        >
          <Text style={[styles.mediumText, { color: _darkGreen }]}>
            120 Points
          </Text>
        </View>

        <View
          style={[
            { flex: 1, backgroundColor: "#c2dbb5", borderRadius: "7%" },
            styles.center,
          ]}
        >
          <Text style={[styles.mediumText, { color: _darkGreen }]}>
            B 0.000025
          </Text>
        </View>
        <FabIcon
          disabled={true}
          scale={0.04}
          style={{
            position: "absolute",
            left: "55%",
            top: "62%",
            zIndex: 10,
          }}
        />
      </View>
      <View
        style={[
          {
            marginHorizontal: "10%",
            marginBottom: "7%",
            minHeight: "5%",
            backgroundColor: _darkGreen,
            borderRadius: "3.5%",
          },
          styles.center,
        ]}
      >
        <Text style={[styles.regular, { color: "#fff" }]}>Swap to Bitcoin</Text>
      </View>
    </View>
  );
}

function OnBoardingScreen4({ index }: { index: number }) {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(1, {
      // damping: 80,
      // stiffness: 200,
      easing: Easing.ease,
      duration: 800,
    });
  }, [index]);

  const containerStylez = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [0, -index * 20 * progress.value]
        ),
      },
    ],
  }));
  return (
    <>
      <Animated.View
        key={`item${index}`}
        style={[
          {
            position: "absolute",
            top: "22%",
            left: "12.5%",
            height: "22%",
            width: "75%",
            borderRadius: "5%",
            backgroundColor: _darkGreen,
            padding: "5%",
            justifyContent: "space-between",
            // transform: [{ translateY: -index * 20 }],
          },
          styles.boxShadow,
          containerStylez,
        ]}
      >
        {index === 2 && (
          <>
            <Animated.View
              entering={FadeInLeft.delay(700)
                .withInitialValues({
                  transform: [{ translateX: -width * 0.08 }],
                })
                .easing(Easing.linear)}
              style={{
                padding: "2.5%",
                backgroundColor: "#fff",
                width: width * 0.15,
                height: width * 0.15,
                borderRadius: width * 0.15,
              }}
            >
              <Animated.Image
                // entering={FadeInLeft.delay(700)
                //   .withInitialValues({
                //     transform: [{ translateX: -width * 0.08 }],
                //   })
                //   .easing(Easing.linear)}
                style={{
                  width: "100%",
                  height: "100%",
                  alignSelf: "flex-start",
                  // transform: [{ translateX: width * 0.05 }],
                }}
                source={require("../assets/starbucks.png")}
                resizeMode="contain"
              />
            </Animated.View>
            <Animated.Image
              entering={FadeInRight.delay(700)
                .withInitialValues({
                  transform: [{ translateX: width * 0.1 }],
                })
                .duration(500)
                .easing(Easing.linear)}
              style={{
                width: "25%",
                height: "30%",
                alignSelf: "flex-end",
                // backgroundColor: "red",
                // transform: [{ translateX: width * 0.05 }],
              }}
              source={require("../assets/barcode.png")}
              resizeMode="contain"
            />
          </>
        )}
      </Animated.View>
    </>
  );
}

export default function UIElements() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const bottomSheetAnimation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 80,
      stiffness: 200,
    });
  }, [selectedIndex]);

  const containerStylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            bottomSheetAnimation.value,
            [selectedIndex - 1, selectedIndex, selectedIndex + 1],
            [-100, 0, 100],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        bottomSheetAnimation.value,
        [0, 1, 2, 3],
        [_lightPink, _lightBlue, _screen13Color, _screen2color]
      ),
    };
  }, [selectedIndex]);

  return (
    <Animated.View
      style={[
        {
          flex: 1,
        },
        stylez,
      ]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      {/* {[0, 1, 2].includes(selectedIndex) && (
        <SVGPathAnimation selectedIndex={selectedIndex} />
      )} */}
      {selectedIndex === 0 ? (
        <>
          <SVGPathAnimation selectedIndex={selectedIndex} />
          {/* <CombinedAnimation selectedIndex={selectedIndex} /> */}
          <OnBoardingScreen1 />
          {/* <FolderShapeWithSkia /> */}
          {/* <FolderStack /> */}
        </>
      ) : selectedIndex === 1 ? (
        <>
          <SVGPathAnimation selectedIndex={selectedIndex} />
          <OnBoardingScreen2 />
        </>
      ) : selectedIndex === 2 ? (
        <>
          <SVGPathAnimation selectedIndex={selectedIndex} />
          <OnBoardingScreen3 />
          {/* <AnimationPath /> */}
        </>
      ) : selectedIndex == 3 ? (
        <>
          <OnBoardingFourSVG selectedIndex={selectedIndex} />
          {[...Array(3).keys()].map((index) => (
            <OnBoardingScreen4 key={`item-${index}`} index={index} />
          ))}
        </>
      ) : (
        <View style={[StyleSheet.absoluteFillObject, styles.center]}>
          <Text>Empty</Text>
        </View>
      )}
      {true && (
        <View
          style={{
            flex: 1,
            padding: "5%",
            paddingBottom: "10%",
            backgroundColor: "#fefefe",
            justifyContent: "space-between",
          }}
        >
          <Animated.View
            style={containerStylez}
            entering={FadeInLeft.springify().damping(80).stiffness(200)}
            exiting={FadeOutRight.springify().damping(80).stiffness(200)}
          >
            <Animated.Text
              entering={FadeInLeft.springify().damping(80).stiffness(200)}
              exiting={FadeOutRight.springify().damping(80).stiffness(200)}
              style={styles.subTitle}
            >
              {splash_text[selectedIndex].title}
            </Animated.Text>
            <Animated.Text
              entering={FadeInLeft.springify().damping(80).stiffness(200)}
              exiting={FadeOutRight.springify().damping(80).stiffness(200)}
              style={[
                styles.regular,
                { lineHeight: height * 0.03, letterSpacing: 0.7 },
              ]}
            >
              {splash_text[selectedIndex].subText}
            </Animated.Text>
          </Animated.View>
          <OnboardingControls
            total={4}
            selectedIndex={selectedIndex}
            onIndexChange={(index) => setSelectedIndex(index)}
            animation={bottomSheetAnimation}
          />
        </View>
      )}
    </Animated.View>
  );
}
