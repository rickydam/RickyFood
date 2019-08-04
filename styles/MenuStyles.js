import {Dimensions, StyleSheet} from "react-native";

const screenWidth = Dimensions.get("window").width;

const menuStyles = StyleSheet.create({
  renderItem: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    width: screenWidth
  },
  renderSectionHeader: {
    backgroundColor: "lightblue",
    borderBottomWidth: 1,
    padding: 5,
    width: screenWidth
  }
});

module.exports = menuStyles;