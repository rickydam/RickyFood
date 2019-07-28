import React from "react";
import { Alert, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import firebase from "firebase";
import mainStyles from "../styles/MainStyles";
import menuItemDetailsStyles from "../styles/MenuItemDetailsStyles"
import touchableOpacity from "../styles/components/TouchableOpacity";

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
    this.setState({
      type: this.props.navigation.state.params["type"],
      name: this.props.navigation.state.params["name"],
      description: this.props.navigation.state.params["description"]
    });
    this.reRender = this.props.navigation.addListener("willFocus", () => {
      this.reloadMenuItem();
    });
  }

  componentWillUnmount() {
    this.reRender.remove();
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={mainStyles.container}>
        <Text style={menuItemDetailsStyles.label}>Name</Text>
        <Text>{this.state.name}</Text>
        <Text style={menuItemDetailsStyles.label}>Description</Text>
        <Text>{this.state.description}</Text>
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
    firebase.database().ref("menu/").child(this.props.navigation.state.params.id).remove().then(() => {
      ToastAndroid.show("Successfully deleted: " + this.props.navigation.state.params.name, ToastAndroid.LONG);
      this.props.navigation.goBack();
    });
  };

  reloadMenuItem = () => {
    let menuItemDetailScreen = this;
    let loadMenuItem = firebase.database().ref("/menu").child(this.props.navigation.state.params.id).once("value", function(snapshot) {
      menuItemDetailScreen.setState({
        type: snapshot.val().type,
        name: snapshot.val().name,
        description: snapshot.val().description
      });
    });
  }
}