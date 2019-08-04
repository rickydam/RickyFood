import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "RLagu"
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")}>
          <View style={touchableOpacity("#2196F3", 40, 10, 100).view}>
            <Text style={touchableOpacity().text}>View Menu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Restaurant")}>
          <View style={touchableOpacity("#9932CC", 40, 20, 130).view}>
            <Text style={touchableOpacity().text}>View Restaurant</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}