import React from "react";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import firebase from "firebase";
import mainStyles from "../styles/MainStyles";
import menuItemDetailsStyles from "../styles/MenuItemDetailsStyles"
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
        <Text style={menuItemDetailsStyles.label}>Name</Text>
        <Text>{this.state.navigationParams["name"]}</Text>
        <Text style={menuItemDetailsStyles.label}>Description</Text>
        <Text>{this.state.navigationParams["description"]}</Text>
        <TouchableOpacity onPress={() => navigate("MenuItem", {
          purpose: "Edit",
          id: this.state.navigationParams["id"],
          name: this.state.navigationParams["name"],
          description: this.state.navigationParams["description"],
          type: this.state.navigationParams["type"]
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
    let params = this.state.navigationParams;
    let menuItemRef = firebase.database().ref(params.type);
    let menuItem = menuItemRef.child(params.id);
    menuItem.remove().then(() => {
      ToastAndroid.show("Successfully removed: " + params.name, ToastAndroid.LONG);
      this.props.navigation.goBack();
    });
  };
}