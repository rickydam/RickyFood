import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class AddMenuItem extends React.Component {
  static navigationOptions = () => {
    return {
      title: "Add Menu Item",
      headerRight: (
        <TouchableOpacity onPress={() => addMenuItem()}>
          <View style={touchableOpacity("#2196F3", 40, 10, 60).view}>
            <Text style={touchableOpacity().text}>Save</Text>
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