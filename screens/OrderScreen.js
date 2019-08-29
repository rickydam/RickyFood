import React from "react";
import {Text, View} from "react-native";
import mainStyles from "../styles/MainStyles";

export default class OrderScreen extends React.Component {
  static navigationOptions = {
    title: "Order"
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>OrderScreen</Text>
      </View>
    );
  }
}