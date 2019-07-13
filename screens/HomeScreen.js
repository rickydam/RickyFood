import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "HomeScreen"
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={mainStyles.container}>
        <TouchableOpacity onPress={() => navigate("Menu")}>
          <View style={touchableOpacity("#2196F3", 40, 10, 100).view}>
            <Text style={touchableOpacity().text}>View Menu</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}