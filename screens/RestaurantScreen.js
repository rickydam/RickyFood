import React from "react";
import { Text, View } from "react-native";
import mainStyles from "../styles/MainStyles";

export default class RestaurantScreen extends React.Component {
  static navigationOptions = {
    title: "Restaurant"
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>RestaurantScreen</Text>
      </View>
    );
  }
}