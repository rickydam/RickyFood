import {StyleSheet} from "react-native";

const layoutStyles = StyleSheet.create({
  table: {
    backgroundColor: "gray",
    position: "absolute",
    height: 60,
    width: 60
  },
  header: {
    flexDirection: "row"
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#CD0000",
    borderRadius: 10,
    borderWidth: 1,
    color: "white",
    height: 20,
    justifyContent: "center",
    position: "absolute",
    right: -5,
    top: -5,
    width: 20
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold"
  }
});

module.exports = layoutStyles;