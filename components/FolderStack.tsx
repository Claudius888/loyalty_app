import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { LineChart } from "react-native-gifted-charts";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { LinearGradient, Stop } from "react-native-svg";
import { getFontSize } from "../helpers/util";
import FolderShapeWithSkia from "./FolderShape"; // Keep FolderShape clean and presentation-focused

const { width, height } = Dimensions.get("window");
function RevenueChart() {
  const { top, bottom } = useSafeAreaInsets();
  const lalbeStyle = { color: "#fff", width: 33 };
  const lineData = [
    {
      label: "Jan",
      value: 40,
      dataPointText: "0",
      labelTextStyle: lalbeStyle,
    },
    {
      label: "Feb",
      value: 30,
      dataPointText: "20",
      labelTextStyle: lalbeStyle,
    },
    {
      label: "Mar",
      value: 18,
      dataPointText: "18",
      labelTextStyle: lalbeStyle,
    },
    {
      label: "Apr",
      value: 18,
      dataPointText: "40",
      labelTextStyle: lalbeStyle,
    },
    {
      label: "May",
      value: 25,
      dataPointText: "36",
      labelTextStyle: lalbeStyle,
    },
    {
      label: "Jun",
      value: 40,
      dataPointText: "60",
      labelTextStyle: lalbeStyle,
    },
    {
      label: "Jul",
      value: 54,
      dataPointText: "54",
      labelTextStyle: lalbeStyle,
    },
    {
      label: "Aug",
      value: 65,
      dataPointText: "85",
      labelTextStyle: lalbeStyle,
    },
    {
      label: "Sep",
      value: 70,
      dataPointText: "65",
      labelTextStyle: lalbeStyle,
    },
    {
      label: "Oct",
      value: 75,
      dataPointText: "75",
      labelTextStyle: lalbeStyle,
    },
    {
      label: "Nov",
      value: 85,
      dataPointText: "85",
      labelTextStyle: lalbeStyle,
    },
    {
      label: "Dec",
      value: 95,
      dataPointText: "95",
      labelTextStyle: lalbeStyle,
    },
  ];
  return (
    <SafeAreaView
      style={[
        styles.placeholder,
        { paddingTop: top, justifyContent: "flex-end", paddingBottom: 5 },
      ]}
    >
      <Text
        style={[
          styles.subTitle,
          { marginLeft: "4%", color: "#fff", position: "absolute", top: top },
        ]}
      >
        Complete Revenue {"\n"} This Year
      </Text>
      <Text
        style={[
          styles.title,
          {
            marginLeft: "4%",
            color: "rgba(255, 0, 0, 0.85)",
            position: "absolute",
            top: top,
            right: 10,
          },
        ]}
      >
        4.93%
      </Text>
      <LineChart
        curved
        data={lineData}
        spacing={33}
        hideDataPoints
        hideRules
        hideYAxisText
        // curveType={""}
        width={width - 30}
        height={height * 0.15}
        xAxisLabelTextStyle={styles.xAxisLabel}
        lineGradient
        lineGradientId="ggrd" // same as the id passed in <LinearGradient> below
        lineGradientComponent={() => {
          return (
            <LinearGradient id="ggrd" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={"red"} />
              <Stop offset="0.5" stopColor={"orange"} />
              <Stop offset="1.5" stopColor={"yellow"} />
            </LinearGradient>
          );
        }}
        // onFocus={() => }
      />
    </SafeAreaView>
  );
}

const FolderStack = () => {
  const [activeFolderIndex, setActiveFolderIndex] = useState(0); // Tracks the active folder
  const scaleY = useSharedValue(2.5); // Shared value for animation

  // useEffect(() => {
  //   console.log("INdex  ", activeFolderIndex);
  // }, [activeFolderIndex]);

  const scale_settings = [
    { collapse: 0.5, expanded: 2.2 },
    { collapse: 1, expanded: 2.35 },
  ];

  const scale_x = [{ multiplier: 1.7 }, { mmultiplier: 1.35 }];

  // Individual scaleY for each folder
  const folderScales = [
    useSharedValue(2.2), // Folder 1
    useSharedValue(2.35), // Folder 2
  ];

  const resizeGesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((event) => {
      const deltaY = event.translationY;
      const activeScale = folderScales[activeFolderIndex];
      const passiveIndex = activeFolderIndex === 0 ? 1 : 0; // Determine passive folder
      const passiveScale = folderScales[passiveIndex]; // Passive folder's scale

      // Active folder scale settings
      const { collapse: collapsedHeight, expanded: expandedHeight } =
        scale_settings[activeFolderIndex];

      // Passive folder scale settings
      const {
        collapse: passiveCollapsedHeight,
        expanded: passiveExpandedHeight,
      } = scale_settings[passiveIndex];

      // console.log(
      //   "Active Folder:",
      //   activeFolderIndex,
      //   "ScaleY:",
      //   activeScale.value
      // );

      // Case 1: Folder 1 is collapsed, Folder 2 is expanded, and bottom-to-top drag should expand Folder 1
      if (
        activeFolderIndex === 0 && // Only trigger when Folder 1 is active
        activeScale.value === collapsedHeight &&
        passiveScale.value === passiveExpandedHeight &&
        deltaY < 0
      ) {
        const newHeight = 1 + deltaY / 200; // Calculate scale
        activeScale.value = Math.max(
          collapsedHeight,
          Math.min(newHeight, expandedHeight)
        );
      }

      // Case 2: Folder 1 is collapsed, Folder 2 is collapsed, and bottom-to-top drag should expand Folder 2
      if (
        activeFolderIndex === 0 && // Only trigger when Folder 1 is active
        activeScale.value === collapsedHeight &&
        passiveScale.value === passiveCollapsedHeight &&
        deltaY < 0
      ) {
        const newHeight = 1 + deltaY / 200; // Calculate scale
        passiveScale.value = Math.max(
          passiveCollapsedHeight,
          Math.min(newHeight, passiveExpandedHeight)
        );
      }

      // Case 3: Dragging top-to-bottom when active folder is expanded
      if (activeScale.value === expandedHeight && deltaY > 0) {
        const newHeight = 2 - deltaY / 200; // Calculate scale
        activeScale.value = Math.max(
          collapsedHeight,
          Math.min(newHeight, expandedHeight)
        );
      }
    })
    .onEnd((event) => {
      const velocityThreshold = 500; // Threshold for drag inertia
      const activeScale = folderScales[activeFolderIndex]; // Current active folder's scale
      const passiveIndex = activeFolderIndex === 0 ? 1 : 0; // Determine the passive folder index
      const passiveScale = folderScales[passiveIndex]; // Passive folder's scale

      // Active folder scale settings
      const { collapse: collapsedHeight, expanded: expandedHeight } =
        scale_settings[activeFolderIndex];

      // Passive folder scale settings
      const {
        collapse: passiveCollapsedHeight,
        expanded: passiveExpandedHeight,
      } = scale_settings[passiveIndex];

      const midpoint = (collapsedHeight + expandedHeight) / 2;

      if (event.velocityY < -velocityThreshold) {
        // Strong upward swipe snaps to expanded state
        if (
          activeFolderIndex === 1 && // Folder 1 is active
          passiveScale.value === passiveCollapsedHeight && // Folder 1 is collapsed
          activeScale.value === expandedHeight // Folder 2 is expanded
        ) {
          // Expand Folder 1
          passiveScale.value = withTiming(passiveExpandedHeight);
          runOnJS(setActiveFolderIndex)(0); // Keep focus on Folder 1
        } else if (
          activeFolderIndex === 0 &&
          activeScale.value === collapsedHeight && // Active folder is collapsed
          passiveScale.value === passiveCollapsedHeight // Both folders are collapsed
        ) {
          // Edge Case 2: Expand Folder 2
          passiveScale.value = withTiming(passiveExpandedHeight);
          runOnJS(setActiveFolderIndex)(1);
        } else {
          // Default: Expand the active folder
          activeScale.value = withTiming(expandedHeight);
        }
      } else if (event.velocityY > velocityThreshold) {
        // Strong downward swipe snaps to collapsed state

        activeScale.value = withTiming(collapsedHeight, {}, () => {
          console.log("Collapsed, active folder:", activeFolderIndex);

          // Handle focus switch after collapsing
          if (activeFolderIndex === 0) {
            runOnJS(setActiveFolderIndex)(1); // Move focus to Folder 2
          } else if (activeFolderIndex === 1) {
            runOnJS(setActiveFolderIndex)(0); // Move focus to Folder 1
          }
        });
      } else {
        // Snap to nearest point based on current scale
        if (activeScale.value > midpoint) {
          // Snap to expanded
          activeScale.value = withTiming(expandedHeight, {}, () => {
            console.log("Expanded, active folder:", activeFolderIndex);
          });
        } else {
          // Snap to collapsed
          activeScale.value = withTiming(collapsedHeight, {}, () => {
            console.log("Collapsed, active folder:", activeFolderIndex);

            // Handle focus switch after collapsing
            if (activeFolderIndex === 0) {
              runOnJS(setActiveFolderIndex)(1); // Move focus to Folder 2
            } else if (activeFolderIndex === 1) {
              runOnJS(setActiveFolderIndex)(0); // Move focus to Folder 1
            }
          });
        }
      }
    });

  return (
    <View style={styles.container}>
      {/* Placeholder for top view */}
      <RevenueChart />

      {/* Gesture Handler applied to the folder stack */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={resizeGesture}>
          <View>
            <Text
              style={[
                styles.subTitle,
                { marginLeft: "4%", color: "#fff", zIndex: 15 },
              ]}
            >
              Sales Revenue
            </Text>
            {/* Folder 1 */}
            <FolderShapeWithSkia
              // isGestureEnabled={currentIndex.value === 1}
              scaleY={scaleY}
              color="light green"
              position={{ top: 0.7, left: 0 }}
              scaleRange={{ collapse: 1, expanded: 2.5 }}
              scaleX={1}
            />

            {/* Folder 2 */}
            <FolderShapeWithSkia
              // isGestureEnabled={currentIndex.value === 0}
              position={{ top: 0.65, left: 20 }}
              scaleY={folderScales[1]}
              color="light blue"
              scaleRange={scale_settings[1]}
              scaleX={scale_x[1]}
            />

            {/* Folder 3 (Static, always collapsed) */}
            <FolderShapeWithSkia
              isGestureEnabled={false}
              isExpanded={false}
              scaleY={folderScales[0]}
              color="light pink"
              position={{ top: 0.6, left: 20 }}
              scaleRange={scale_settings[0]}
              scaleX={scale_x[0]}
            />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  placeholder: {
    width: "100%",
    height: "30%",
    // backgroundColor: "lime",
  },
  title: {
    fontSize: getFontSize(30),
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: getFontSize(20),
    fontWeight: "semibold",
  },
  regular: {
    fontSize: getFontSize(14),
    fontWeight: "medium",
  },
  xAxisLabel: {
    fontSize: getFontSize(8),
    fontWeight: 500,
  },
});

export default FolderStack;
