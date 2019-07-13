import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import addMenuItemStyles from "../styles/AddMenuItemStyles";

export default class AddMenuItem extends React.Component {
  static navigationOptions = () => {
    return {
      title: "AddMenuItemScreen",
      headerRight: (
        <TouchableOpacity onPress={() => addMenuItem()}>
          <View style={addMenuItemStyles.saveButton}>
            <Text style={addMenuItemStyles.saveButtonText}>Save</Text>
          </View>
        </TouchableOpacity>
      )
    }
  };
  render() {
    return (
      <View style={mainStyles.container}>
        <Text>This is the AddMenuItemScreen.</Text>
      </View>
    );
  }
}

function addMenuItem() {

}