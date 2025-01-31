import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getDimensions, getFontSize } from "../../helpers/util";

const _categories: string[] = ["All", "Fashion", "Food", "Health", "Tech"];

const { SCREEN_HEIGHT, SCREEN_WIDTH } = getDimensions();
const _darkGreen = "#016b45";

export default function CategoryList() {
  return (
    <View>
      <FlatList
        horizontal
        contentContainerStyle={styles.container}
        data={_categories}
        showsHorizontalScrollIndicator={false}
        renderItem={(item) => {
          const isFirstItem = item.index === 0;
          return (
            <View
              style={[
                isFirstItem ? styles.first : styles.otherCategory,
                styles.center,
                { marginHorizontal: 5 },
              ]}
            >
              <Text
                style={[styles.mediumText, isFirstItem && { color: "white" }]}
              >
                {item.item}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: SCREEN_WIDTH * 0.05,
    paddingTop: SCREEN_WIDTH * 0.07,
  },
  first: {
    minWidth: SCREEN_WIDTH * 0.15,
    height: SCREEN_WIDTH * 0.12,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: _darkGreen,
  },
  otherCategory: {
    minWidth: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.12,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "white",
  },
  badgeText: {
    fontSize: getFontSize(12),
    fontFamily: "Causten-Regular",
  },
  mediumText: {
    fontSize: getFontSize(18),
    fontFamily: "Causten-Medium",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
