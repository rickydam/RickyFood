import React from "react";
import {View} from "react-native";
import mainStyles from "../styles/MainStyles";

export default class AuthenticationScreen extends React.Component {
  static navigationOptions = {
    title: "Register or Login"
  };

  render() {
    return (
      <View style={mainStyles.container}>
      </View>
    );
  }
}