import React from "react";
import {Text, View} from "react-native";
import mainStyles from "../styles/MainStyles";

export default class CreateRestaurantScreen extends React.Component {
  static navigationOptions = {
    title: "Create Restaurant"
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>CreateRestaurantScreen</Text>
      </View>
    );
  }
}