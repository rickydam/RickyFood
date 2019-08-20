import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "RickyFood",
      headerRight: (
        <View style={mainStyles.headerRow}>
          <TouchableOpacity onPress={() => navigation.navigate("Authentication", {purpose: "Register"})}>
            <View style={touchableOpacity("#707070", 40, 5, 70).view}>
              <Text style={touchableOpacity().text}>Register</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Authentication", {purpose: "Login"})}>
            <View style={touchableOpacity("#707070", 40, 5, 60).view}>
              <Text style={touchableOpacity().text}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
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