import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import homeStyles from "../styles/HomeStyles";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "HomeScreen"
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={mainStyles.container}>
        <TouchableOpacity onPress={() => navigate("Menu")}>
          <View style={homeStyles.viewMenuButton}>
            <Text style={homeStyles.viewMenuButtonText}>View Menu</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}