import React from "react";
import {View} from "react-native"
import loginStyles from "../styles/LoginStyles";
import mainStyles from "../styles/MainStyles";

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