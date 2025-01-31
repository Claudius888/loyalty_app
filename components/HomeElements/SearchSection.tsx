import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { getFontSize } from "../../helpers/util";
import RoundBtn, { IconType } from "./RoundBtn";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const _defaultTitle = `Good morning, \n Thomas`;
export const SearchSection = ({
  title = _defaultTitle,
  subTitle,
}: {
  title?: string;
  subTitle?: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          {/* <View style={styles.circle} /> */}
          <RoundBtn
            icon={{ type: IconType.Feather, name: "user" }}
            buttonShadow
          />
          <View
            style={[
              styles.center,
              { marginLeft: 20, alignItems: "flex-start" },
            ]}
          >
            <Text style={styles.mediumText}>Thomas</Text>
            <Text style={styles.regular}>250 points - B0.00025</Text>
          </View>
        </View>
        {/* <View style={styles.circle} /> */}
        <RoundBtn
          icon={{ type: IconType.FontAwesome, name: "bell-o" }}
          buttonShadow
        />
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
        <View style={[styles.inputContainer]}>
          <Ionicons name="search" size={24} color="#000" />
          <TextInput
            style={[{ paddingLeft: 20 }, styles.regular]}
            placeholder="Search store"
          />
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
    height: windowHeight * 0.4,
    justifyContent: "space-between",
    elevation: 1500,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 25,
  },
  row: {
    flexDirection: "row",
  },
  inputContainer: {
    backgroundColor: "#F1F3F8",
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    fontSize: getFontSize(40),
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
