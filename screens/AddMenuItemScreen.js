import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import firebase from "firebase";
import mainStyles from "../styles/MainStyles";
import addMenuItemStyles from "../styles/AddMenuItemStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class AddMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      name: ""
    };
  }

  static navigationOptions = {
    title: "Add Menu Item",
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <View style={addMenuItemStyles.fieldContainer}>
          <Text style={addMenuItemStyles.textInputLabel}>Name</Text>
          <TextInput
            onChangeText={(name) => this.setState({name})}
            style={addMenuItemStyles.textInput}
            value={this.state.name}
          />
        </View>
        <View style={addMenuItemStyles.fieldContainer}>
          <Text style={addMenuItemStyles.textInputLabel}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={3}
            onChangeText={(description) => this.setState({description})}
            style={[addMenuItemStyles.textInput, addMenuItemStyles.alignTop]}
            value={this.state.description}
          />
        </View>
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
    let description = this.state.description;
    firebase.database().ref("Fruits/").push({
      name,
      description
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error)
    });
  };
}