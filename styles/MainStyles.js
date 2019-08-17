import {StyleSheet} from "react-native";

const mainStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "lightgray",
    flex: 1,
    justifyContent: "center"
  },
  table: {
    backgroundColor: "gray",
    position: "absolute",
    height: 60,
    width: 60
  }
});

module.exports = mainStyles;