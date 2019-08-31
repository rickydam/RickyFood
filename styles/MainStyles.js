import {StyleSheet} from "react-native";

const mainStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "lightgray",
    flex: 1,
    justifyContent: "center"
  },
  row: {
    flexDirection: "row"
  },
  icon: {
    height: 25,
    width: 25
  },
  picker: {
    height: 40,
    margin: 0,
    padding: 0,
    width: 250
  },
  pickerView: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 40,
    width: 250
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
    padding: 10,
    width: 250
  }
});

module.exports = mainStyles;