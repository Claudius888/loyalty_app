import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getFontSize } from "../../helpers/util";

export default function SectionHeader({
  title = "Featured",
}: {
  title: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.mainText, { color: "#92939f" }]}>{title}</Text>
      <Pressable>
        <Text style={styles.mainText}>See all</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: 30,
  },
  mainText: {
    fontSize: getFontSize(20),
    fontFamily: "Causten-Medium",
  },
});
