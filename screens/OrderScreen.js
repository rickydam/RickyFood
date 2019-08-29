import React from "react";
import {Image, View} from "react-native";
import mainStyles from "../styles/MainStyles";

const orderIcon = require("../images/icons/order.png");

export default class OrderScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Image source={orderIcon} style={[mainStyles.icon, {tintColor: tintColor}]} />
    ),
    tabBarLabel: "Order",
    title: "Order"
  };

  render() {
    return (
      <View style={mainStyles.container}>
      </View>
    );
  }
}