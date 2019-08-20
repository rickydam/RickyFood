import React from "react";
import {View} from "react-native";
import mainStyles from "../styles/MainStyles";

export default class AuthenticationScreen extends React.Component {
  static navigationOptions = {
    title: "Authentication"
  };

  render() {
    return (
      <View style={mainStyles.container}>
      </View>
    );
  }
}