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
import { Dimensions, View } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { svg_string } from "./SvgString";

const { width, height } = Dimensions.get("window");

export const _ref_width = 430;
export const _ref_height = 932;

export const svgScaleFactor = width / _ref_width;

const SVGPathAnimation = React.memo(
  ({ selectedIndex }: { selectedIndex: number }) => {
    const progress = useSharedValue(0);
    // const tprogress = useClock();

    const selectedPath = useMemo(() => {
      return selectedIndex === 0
        ? svg_string.SVG_PATH
        : selectedIndex === 1
        ? svg_string.SCREEN2_PATH
        : svg_string.SCREEN3_PATH;
    }, [selectedIndex]);

    const selectedBobPath = useMemo(() => {
      return selectedIndex === 0
        ? svg_string.BOB_PATH_SCREEN1
        : selectedIndex === 1
        ? svg_string.SCREEN2_BOBHEAD
        : selectedIndex === 2
        ? svg_string.BOB_PATH
        : svg_string.BOB_PATH_SCREEN4;
    }, [selectedIndex]);

    const path = useMemo(() => {
      return Skia.Path.MakeFromSVGString(selectedPath);
    }, [selectedPath])!;

    const bob_path = useMemo(
      () => Skia.SVG.MakeFromString(selectedBobPath),
      [selectedBobPath]
    )!;

    React.useEffect(() => {
      progress.value = withTiming(1, {
        duration: 3000,
        easing: Easing.inOut(Easing.cubic),
      });
    }, [selectedIndex]);

    React.useEffect(
      () => () => {
        progress.value = 0;
      },
      [selectedIndex]
    );

    const bob_coords = useMemo(() => {
      const coords = [
        { x: 0.45, y: 0.47 },
        { x: 0.5, y: 0.47 },
        { x: 0.45, y: 0.5 },
        { x: 0.45, y: 0.5 },
      ];

      if (svgScaleFactor > 1 || svgScaleFactor < 1) {
        return {
          x: coords[selectedIndex].x + 0.1,
          y: coords[selectedIndex].y - 0.08,
        };
      }
      return coords[selectedIndex];
    }, [selectedIndex]);

    // const animatedPath = useDerivedValue(() => {
    //   if (!path) return null;

    //   const dashPath = path.copy();

    //   const end = Math.min(progress.value, 1);

    //   dashPath.trim(0, end, false);
    //   return dashPath;
    // }, [progress, path])!;

    const animatedPath = useDerivedValue(() => {
      const end = Math.min(progress.value, 1);
      return end;
    }, [progress, path])!;

    const srcPathRect = useMemo(() => {
      return selectedIndex === 0
        ? rect(0, 0, 230, 334)
        : selectedIndex === 1
        ? rect(0, 0, 338, 219)
        : rect(0, 0, 222, 351);
    }, [selectedIndex]);

    const destRect = useMemo(() => {
      return selectedIndex === 0
        ? rect(0, 0, width, height * 0.8)
        : rect(0, 0, width, height / 2);
    }, [selectedIndex]);

    const transformPath = useMemo(() => {
      return selectedIndex === 0
        ? [{ translateX: 0, translateY: -50 }, { scale: 0.7 }]
        : selectedIndex === 1
        ? [{ translateX: -25 }, { scale: 1.1 }]
        : [
            { translateX: -100 },
            // { scale: 0.5 },
          ];
    }, [selectedIndex]);

    const bob_rotateZ = useDerivedValue(() => {
      // console.log("Progress", (2.5 - progress.value * 0.5) * Math.PI);
      return [
        {
          rotateZ: (2.5 - progress.value * 0.5) * Math.PI,
        },
        {
          scale: Math.min(width / _ref_width, height / _ref_height),
        },
      ];
    }, [progress]);

    if (!bob_path || !animatedPath) return <View />;

    return (
      <Canvas
        style={{
          width: "100%",
          height: "64%",
          // backgroundColor: "red",
        }}
      >
        <FitBox fit="contain" src={srcPathRect} dst={destRect}>
          <Path
            path={path}
            end={animatedPath}
            style="stroke"
            strokeWidth={6}
            color="white"
            // { translateX: progress.value * (width - 299) },
            transform={transformPath}
          />
        </FitBox>
        <Group
          origin={{ x: width * 0.5, y: height * 0.7 }}
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
  }
);

export default SVGPathAnimation;
