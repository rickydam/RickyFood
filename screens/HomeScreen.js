import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/MainStyles";

export default class HomeScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate("Menu")}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>View Menu</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}