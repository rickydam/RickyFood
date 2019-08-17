import React from "react";
import {View} from "react-native"
import mainStyles from "../styles/MainStyles";
import loginStyles from "../styles/LoginStyles";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  render() {
    return (
      <View style={mainStyles.container}>
      </View>
    );
  }
}