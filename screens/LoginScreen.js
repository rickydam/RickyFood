import React from "react";
import {Text, TouchableOpacity, View} from "react-native"
import loginStyles from "../styles/LoginStyles";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class LoginScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Login",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <View style={touchableOpacity("#2196F3", 40, 10, 65).view}>
          <Text style={touchableOpacity().text}>Register</Text>
        </View>
      </TouchableOpacity>
    )
  });

  render() {
    return (
      <View style={mainStyles.container}>
      </View>
    );
  }
}