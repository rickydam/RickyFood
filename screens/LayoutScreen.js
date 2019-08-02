import React from "react";
import {View} from "react-native";
import mainStyles from "../styles/MainStyles";
import Table from "../components/Table";

export default class LayoutScreen extends React.Component {
  static navigationOptions = {
    title: "Layout"
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <Table />
      </View>
    );
  }
}