import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import firebase from 'firebase';
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class AddMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  static navigationOptions = {
    title: "Add Menu Item",
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <TextInput
          onChangeText={(name) => this.setState({name})}
          placeholder="Name"
          value={this.state.name}
        />
        <TouchableOpacity onPress={() => this.addMenuItem()}>
          <View style={touchableOpacity("#2196F3", 40, 10, 60).view}>
            <Text style={touchableOpacity().text}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  addMenuItem = () => {
    let name = this.state.name;
    firebase.database().ref('Fruits/').push({
      name
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error)
    });
  };
}