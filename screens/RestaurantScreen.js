import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class RestaurantScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Restaurant",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("Layout")}>
        <View style={touchableOpacity("#9932CC", 40, 10, 60).view}>
          <Text style={touchableOpacity().text}>Layout</Text>
        </View>
      </TouchableOpacity>
    )
  });

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>RestaurantScreen</Text>
      </View>
    );
  }
}