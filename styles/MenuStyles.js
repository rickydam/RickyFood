import {Dimensions, StyleSheet} from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const menuStyles = StyleSheet.create({
  menuContainer: {
    borderWidth: 1,
    height: screenHeight * 0.5
  },
  renderItem: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    width: screenWidth * 0.80
  },
  renderSectionHeader: {
    backgroundColor: "lightblue",
    borderBottomWidth: 1,
    padding: 5,
    width: screenWidth * 0.80
  }
});

module.exports = menuStyles;