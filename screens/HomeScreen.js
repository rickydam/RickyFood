import React from "react";
import {Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../firebase/FirebaseFunctions";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }

  static navigationOptions = ({navigation}) => {
    return {
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
        <Text>HomeScreen</Text>
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