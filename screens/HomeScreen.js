import React from "react";
import {Text, ToastAndroid, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import firebaseFunctions from "../firebase/FirebaseFunctions";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "RickyFood"
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