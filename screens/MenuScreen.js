import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class MenuScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Menu Items",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("AddMenuItem")}>
        <View style={touchableOpacity("#2196F3", 40, 10, 60).view}>
          <Text style={touchableOpacity().text}>Add</Text>
        </View>
      </TouchableOpacity>
    )
  });
  render() {
    return (
      <View style={mainStyles.container}>
        <Text>This is the MenuScreen.</Text>
      </View>
    );
  }
}