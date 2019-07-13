import React from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import menuStyles from "../styles/MenuStyles";

export default class MenuScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: "MenuScreen",
      headerRight: (
        <TouchableOpacity onPress={() => Alert.alert("Add Menu Item", "Some food")}>
          <View style={menuStyles.addButton}>
            <Text style={menuStyles.addButtonText}>Add</Text>
          </View>
        </TouchableOpacity>
      )
    };
  };
  render() {
    return (
      <View style={mainStyles.container}>
        <Text>This is the MenuScreen.</Text>
      </View>
    );
  }
}