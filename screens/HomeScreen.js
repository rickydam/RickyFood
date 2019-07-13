import React from "react";
import { Alert, Text, TouchableOpacity, StyleSheet, View} from "react-native";

export default class HomeScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Alert.alert("Menu", "Food items")}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>View Menu</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#428BCA',
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
    width: 120,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});