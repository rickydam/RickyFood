import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

const profileIcon = require("../images/icons/profile.png");

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Image source={profileIcon} style={[mainStyles.icon, {tintColor: tintColor}]} />
    ),
    tabBarLabel: "Profile",
    title: "Profile"
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <View style={mainStyles.row}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Authentication", {purpose: "Register"})}>
            <View style={touchableOpacity("#707070", 40, 5, 70).view}>
              <Text style={touchableOpacity().text}>Register</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Authentication", {purpose: "Login"})}>
            <View style={touchableOpacity("#707070", 40, 5, 60).view}>
              <Text style={touchableOpacity().text}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.state.params.logout()}>
            <View style={touchableOpacity("#707070", 40, 5, 60).view}>
              <Text style={touchableOpacity().text}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}