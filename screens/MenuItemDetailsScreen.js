import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import firebase from 'firebase';
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class MenuItemDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationParams: ""
    }
  }

  static navigationOptions = {
    title: "Menu Item Details"
  };

  componentDidMount() {
    this.setState({
      navigationParams: this.props.navigation.state.params
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={mainStyles.container}>
        <Text>Name</Text>
        <Text>{this.state.navigationParams["name"]}</Text>
        <Text>Description</Text>
        <Text>{this.state.navigationParams["description"]}</Text>
        <TouchableOpacity onPress={() => navigate("MenuItem", {purpose: "Edit"})}>
          <View style={touchableOpacity("#2196F3", 40, 10, 60).view}>
            <Text style={touchableOpacity().text}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.deleteMenuItem()}>
          <View style={touchableOpacity("#CD0000", 40, 10, 60).view}>
            <Text style={touchableOpacity().text}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  deleteMenuItem = () => {
    let params = this.state.navigationParams;
    let menuItemRef = firebase.database().ref(params.type);
    let menuItemChild = menuItemRef.child(params.id);
    menuItemChild.remove();
  };
}