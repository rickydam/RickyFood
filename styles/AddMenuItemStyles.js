import { StyleSheet } from 'react-native';

const addMenuItemStyles = StyleSheet.create({
  saveButton: {
    alignItems: "center",
    backgroundColor: "#2196F3",
    borderRadius: 5,
    justifyContent: "center",
    height: 40,
    margin: 10,
    width: 60
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold"
  }
});

module.exports = addMenuItemStyles;