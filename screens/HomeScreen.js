import React from "react";
import {Image, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../firebase/FirebaseFunctions";

const homeIcon = require("../images/icons/home.png");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }

  static navigationOptions = ({navigation}) => {
    return {
      tabBarIcon: ({tintColor}) => (
        <Image
          source={homeIcon}
          style={[mainStyles.icon, {tintColor: tintColor}]}
        />
      ),
      tabBarLabel: "Home",
      title: "RickyFood",
      headerRight: (
        <View style={mainStyles.headerRow}>
          <TouchableOpacity onPress={() => navigation.navigate("Authentication", {purpose: "Register"})}>
            <View style={touchableOpacity("#707070", 40, 5, 70).view}>
              <Text style={touchableOpacity().text}>Register</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Authentication", {purpose: "Login"})}>
            <View style={touchableOpacity("#707070", 40, 5, 60).view}>
              <Text style={touchableOpacity().text}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.state.params.logout()}>
            <View style={touchableOpacity("#707070", 40, 5, 60).view}>
              <Text style={touchableOpacity().text}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  };

  componentDidMount() {
    this.reRender = this.props.navigation.addListener("willFocus", () => {
      this.checkUserAuthentication();
    });
    this.props.navigation.setParams({
      logout: this.logout
    });
  }

  render() {
    return (
      <View style={mainStyles.container}>
        {this.state.user ? <Text>{this.state.user.email}</Text> : null}
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")}>
          <View style={touchableOpacity("#2196F3", 40, 10, 100).view}>
            <Text style={touchableOpacity().text}>View Menu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Restaurant")}>
          <View style={touchableOpacity("#9932CC", 40, 20, 130).view}>
            <Text style={touchableOpacity().text}>View Restaurant</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  checkUserAuthentication = () => {
    firebaseFunctions.checkUserAuthentication(user => {
      this.setState({user: user});
    });
  };

  logout = () => {
    let homeScreen = this;
    firebaseFunctions.logout(function() {
      ToastAndroid.show("Logout successful.", ToastAndroid.LONG);
      homeScreen.setState({user: null});
    })
  }
}