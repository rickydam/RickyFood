import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const menuItemStyles = StyleSheet.create({
  alignTop: {
    textAlignVertical: "top",
  },
  fieldContainer: {
    margin: 10
  },
  picker: {
    backgroundColor: "white",
    height: 37,
    width: deviceWidth * 0.8
  },
  pickerView: {
    borderWidth: 1,
    height: 40,
    width: (deviceWidth * 0.8) + 2
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

module.exports = menuItemStyles;