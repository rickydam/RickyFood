import React from "react";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import firebase from "firebase";
import mainStyles from "../styles/MainStyles";
import menuItemDetailsStyles from "../styles/MenuItemDetailsStyles"
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class MenuItemDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Menu Item Details"
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={mainStyles.container}>
        <Text style={menuItemDetailsStyles.label}>Name</Text>
        <Text>{this.props.navigation.state.params["name"]}</Text>
        <Text style={menuItemDetailsStyles.label}>Description</Text>
        <Text>{this.props.navigation.state.params["description"]}</Text>
        <TouchableOpacity onPress={() => navigate("MenuItem", {
          purpose: "Edit",
          id: this.props.navigation.state.params["id"],
          name: this.props.navigation.state.params["name"],
          description: this.props.navigation.state.params["description"],
          type: this.props.navigation.state.params["type"]
        })}>
          <View style={touchableOpacity("#2196F3", 40, 15, 60).view}>
            <Text style={touchableOpacity().text}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.deleteMenuItem()}>
          <View style={touchableOpacity("#CD0000", 40, 15, 60).view}>
            <Text style={touchableOpacity().text}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  deleteMenuItem = () => {
    let menuItemRef = firebase.database().ref(this.props.navigation.state.params.type);
    let menuItem = menuItemRef.child(this.props.navigation.state.params.id);
    menuItem.remove().then(() => {
      ToastAndroid.show("Successfully deleted: " + this.props.navigation.state.params.name, ToastAndroid.LONG);
      this.props.navigation.goBack();
    });
  };
}