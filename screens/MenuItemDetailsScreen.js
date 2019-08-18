import React from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import menuItemDetailsStyles from "../styles/MenuItemDetailsStyles"
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../firebase/FirebaseFunctions";

export default class MenuItemDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      description: ""
    };
  }

  static navigationOptions = {
    title: "Menu Item Details"
  };

  componentDidMount() {
    this.reRender = this.props.navigation.addListener("willFocus", () => {
      this.loadMenuItem();
    });
  }

  componentWillUnmount() {
    this.reRender.remove();
  }

  render() {
    return (
      <View style={mainStyles.container}>
        <Text style={menuItemDetailsStyles.label}>Type</Text>
        <Text>{this.state.type.charAt(0).toUpperCase() + this.state.type.slice(1)}</Text>
        <Text style={menuItemDetailsStyles.label}>Name</Text>
        <Text>{this.state.name}</Text>
        <Text style={menuItemDetailsStyles.label}>Description</Text>
        <Text>{this.state.description}</Text>
        <TouchableOpacity onPress={() => ToastAndroid.show("Added " + this.state.name + " to the order.", ToastAndroid.LONG)}>
          <View style={touchableOpacity("#9932CC", 40, 15, 100).view}>
            <Text style={touchableOpacity().text}>Add to Order</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("MenuItem", {
          purpose: "Edit",
          id: this.props.navigation.state.params["id"],
          name: this.state.name,
          description: this.state.description,
          type: this.state.type
        })}>
          <View style={touchableOpacity("#2196F3", 40, 15, 60).view}>
            <Text style={touchableOpacity().text}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.deleteButtonPressed()}>
          <View style={touchableOpacity("#CD0000", 40, 15, 60).view}>
            <Text style={touchableOpacity().text}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  deleteButtonPressed() {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this menu item? This cannot be undone.",
      [
        {text: "Cancel", onPress: () => {}},
        {text: "OK", onPress: () => this.deleteMenuItem()}
      ]
    );
  }

  deleteMenuItem = () => {
    let menuItemDetailsScreen = this;
    let id = this.props.navigation.state.params.id;
    let name = this.state.name;
    firebaseFunctions.deleteMenuItem(menuItemDetailsScreen, id, name);
  };

  loadMenuItem = () => {
    let menuItemDetailsScreen = this;
    let id = this.props.navigation.state.params.id;
    firebaseFunctions.loadMenuItem(menuItemDetailsScreen, id);
  };
}