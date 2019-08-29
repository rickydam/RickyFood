import React from "react";
import {Image, View} from "react-native";
import mainStyles from "../styles/MainStyles";

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
      </View>
    );
  }
}