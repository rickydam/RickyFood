import React from "react";
import { Text, View } from "react-native";
import mainStyles from "../styles/MainStyles";

export default class LayoutScreen extends React.Component {
  static navigationOptions = {
    title: "Layout"
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>LayoutScreen</Text>
      </View>
    );
  }
}