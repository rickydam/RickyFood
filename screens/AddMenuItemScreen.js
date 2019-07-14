import React from "react";
import { Picker, Text, TextInput, TouchableOpacity, View } from "react-native";
import firebase from "firebase";
import mainStyles from "../styles/MainStyles";
import addMenuItemStyles from "../styles/AddMenuItemStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class AddMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "appetizer",
      name: "",
      description: ""
    };
  }

  static navigationOptions = {
    title: "Add Menu Item",
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <View style={addMenuItemStyles.fieldContainer}>
          <Text style={addMenuItemStyles.textInputLabel}>Type</Text>
          <Picker
            onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}
            selectedValue={this.state.type}
            style={addMenuItemStyles.picker}>
            <Picker.Item label="Appetizer" value="appetizer" />
            <Picker.Item label="Main" value="main" />
            <Picker.Item label="Dessert" value="dessert" />
            <Picker.Item label="Beverage" value="beverage" />
          </Picker>
        </View>
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
    let type = this.state.type;
    let name = this.state.name;
    let description = this.state.description;

    let firebaseRef;
    if(type === "appetizer") firebaseRef = firebase.database().ref("appetizers/");
    if(type === "main") firebaseRef = firebase.database().ref("mains/");
    if(type === "dessert") firebaseRef = firebase.database().ref("desserts/");
    if(type === "beverage") firebaseRef = firebase.database().ref("beverages/");

    firebaseRef.push({
      type,
      name,
      description
    }).then(() => {
      this.setState({
        type: "appetizer",
        name: "",
        description: ""
      });
    }).catch((error) => {
      console.log(error)
    });
  };
}