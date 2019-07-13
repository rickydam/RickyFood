import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const addMenuItemStyles = StyleSheet.create({
  alignTop: {
    textAlignVertical: "top",
  },
  fieldContainer: {
    margin: 10
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 1,
    padding: 5,
    width: deviceWidth * 0.8
  },
  textInputLabel: {
    color: "black"
  }
});

module.exports = addMenuItemStyles;