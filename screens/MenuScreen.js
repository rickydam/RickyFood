import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/MainStyles";

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    title: "MenuScreen"
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the MenuScreen.</Text>
      </View>
    );
  }
}