import {StyleSheet} from "react-native";

const mainStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "lightgray",
    flex: 1,
    justifyContent: "center"
  },
  headerRow: {
    flexDirection: "row"
  },
  icon: {
    height: 30,
    width: 30
  },
  table: {
    backgroundColor: "gray",
    position: "absolute",
    height: 60,
    width: 60
  },
  textInput: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 40,
    margin: 5,
    width: 250
  }
});

module.exports = mainStyles;