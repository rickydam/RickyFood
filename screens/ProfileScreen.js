import React from "react";
import {Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../firebase/FirebaseFunctions";
import AsyncStorage from "@react-native-community/async-storage";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null, userType: null}
  }

  static navigationOptions = {
    title: "Profile"
  };

  componentDidMount() {
    this.reRender = this.props.navigation.addListener("willFocus", () => {
      this.checkUserAuthentication();
      this.getItemUserType();
    });
    this.props.navigation.setParams({
      logout: this.logout
    });
  }

  render() {
    if(this.state.user) {
      return (
        <View style={mainStyles.container}>
          <View style={mainStyles.row}>
            <TouchableOpacity onPress={() => this.props.navigation.state.params.logout()}>
              <View style={touchableOpacity("#707070", 40, 5, 60).view}>
                <Text style={touchableOpacity().text}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {this.state.user ? <Text>{this.state.user.email}</Text> : null}
            {this.state.userType ? <Text>{this.state.userType}</Text> : null }
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={mainStyles.container}>
          <View style={mainStyles.row}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Authentication", {purpose: "Register"})}>
              <View style={touchableOpacity("#707070", 40, 5, 70).view}>
                <Text style={touchableOpacity().text}>Register</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Authentication", {purpose: "Login"})}>
              <View style={touchableOpacity("#707070", 40, 5, 60).view}>
                <Text style={touchableOpacity().text}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

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
      homeScreen.removeItemUserType();
    })
  };

  getItemUserType = async () => {
    try {
      const value = await AsyncStorage.getItem("user_type");
      if(value != null) this.setState({userType: value});
    } catch(e) {
      ToastAndroid.show("Unable to get user type from AsyncStorage.", ToastAndroid.LONG);
    }
  };

  removeItemUserType = async () => {
    try {
      await AsyncStorage.removeItem("user_type");
      this.setState({userType: null});
    } catch(e) {
      ToastAndroid.show("Unable to remove user type from AsyncStorage.", ToastAndroid.LONG);
    }
  };
}