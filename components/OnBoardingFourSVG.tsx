import {
  Canvas,
  FitBox,
  Group,
  ImageSVG,
  Path,
  rect,
  Skia,
} from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { Dimensions } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { _ref_height, _ref_width, svgScaleFactor } from "./OnBoardingBase";
import { svg_string } from "./SvgString";

const { width, height } = Dimensions.get("window");

const isScaleFactorActive = svgScaleFactor > 1 || svgScaleFactor < 1;

const OnBoardingFourSVG = ({ selectedIndex }: { selectedIndex: number }) => {
  const progress = useSharedValue(0);

  const path = useMemo(
    () => Skia.Path.MakeFromSVGString(svg_string.SCREEN4_PATH),
    []
  )!;
  const below_path = useMemo(
    () => Skia.Path.MakeFromSVGString(svg_string.SCREEN4_BELOWPATH),
    []
  )!;
  const bob_path = useMemo(
    () => Skia.SVG.MakeFromString(svg_string.BOB_PATH_SCREEN4),
    []
  )!;

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.inOut(Easing.cubic),
      }),
      1
    );
  }, [selectedIndex]);

  React.useEffect(
    () => () => {
      progress.value = 0;
    },
    [selectedIndex]
  );

  const animatedEnd = useDerivedValue(() => {
    const end = Math.min(progress.value, 1);

    return end;
  }, [progress]);

  const bob_rotateZ = useDerivedValue(() => {
    return [
      {
        rotateZ: (2.5 - progress.value * 0.5) * Math.PI,
      },
      {
        scale: Math.min(width / _ref_width, height / _ref_height),
      },
    ];
  }, [progress]);

  const bob_coords = useMemo(() => {
    if (svgScaleFactor > 1 || svgScaleFactor < 1) {
      return {
        x: 0.58 + 0.1,
        y: 0.5 - 0.08,
      };
    }
    return { x: 0.58, y: 0.5 };
  }, [selectedIndex]);

  if (!bob_path) return null;

  return (
    <Canvas
      style={{
        width: "100%",
        height: "64%",
      }}
    >
      <FitBox
        fit="contain"
        src={rect(0, 0, 258, 339)}
        dst={rect(0, 0, width, height / 2)}
      >
        <Path
          // path={animatedPath}
          path={path}
          end={animatedEnd}
          style="stroke"
          strokeWidth={6}
          color="white"
          // { translateX: progress.value * (width - 299) },
          transform={[
            { translateX: isScaleFactorActive ? 55 : 30, translateY: -50 },
            { scale: 1 },
          ]}
        />
      </FitBox>
      <Path
        // path={animatedBelowPath}
        path={below_path}
        end={animatedEnd}
        style="stroke"
        strokeWidth={6}
        color="white"
        // { translateX: progress.value * (width - 299) },
        transform={[{ translateX: -25, translateY: -200 }, { scale: 1.5 }]}
      />
      <Group
        // origin={{ x: (430 - 241) / 1.55, y: (height / 2) * 1.55 - 138 }}
        origin={{ x: width * 0.6, y: height * 0.7 }}
        transform={bob_rotateZ}
        style={"fill"}
      >
        <ImageSVG
          svg={bob_path}
          x={width * bob_coords.x}
          y={height * bob_coords.y}
        />
      </Group>
    </Canvas>
  );
};

export default OnBoardingFourSVG;
