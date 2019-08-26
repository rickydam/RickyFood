import React from "react";
import {Alert, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../firebase/FirebaseFunctions";

export default class AuthenticationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.purpose
    };
  };

  render() {
    if(this.props.navigation.state.params.purpose === "Register") {
      return (
        <View style={mainStyles.container}>
          <Text>Email</Text>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={mainStyles.textInput}
            onChangeText={email => this.setState({email: email})}
          />
          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            style={mainStyles.textInput}
            onChangeText={password => this.setState({password: password})}
          />
          <TouchableOpacity onPress={() => this.registerUser()}>
            <View style={touchableOpacity("#2196F3", 40, 5, 70).view}>
              <Text style={touchableOpacity().text}>{this.props.navigation.state.params.purpose}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <View style={mainStyles.container}>
          <Text>Email</Text>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={mainStyles.textInput}
            onChangeText={email => this.setState({email: email})}
          />
          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            style={mainStyles.textInput}
            onChangeText={password => this.setState({password: password})}
          />
          <TouchableOpacity onPress={() => {}}>
            <View style={touchableOpacity("#2196F3", 40, 5, 60).view}>
              <Text style={touchableOpacity().text}>{this.props.navigation.state.params.purpose}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  registerUser = () => {
    let authenticationScreen = this;
    if(this.state.email != null) {
      if(this.state.password != null) {
        firebaseFunctions.registerUser(this.state.email, this.state.password, function(response) {
          if(response === null) {
            ToastAndroid.show("Registration successful.", ToastAndroid.LONG);
            authenticationScreen.props.navigation.goBack();
          }
          else if(response.code === "auth/weak-password") {
            Alert.alert(
              "Password too short",
              response.message,
              [{text: "OK", onPress: () => {}}],
              {cancelable: true}
            );
          }
          else {}
        });
      }
      else {
        Alert.alert(
          "Blank password",
          "Please provide a password.",
          [{text: "OK", onPress: () => {}}],
          {cancelable: true}
        );
      }
    }
    else {
      Alert.alert(
        "Blank email",
        "Please provide an email.",
        [{text: "OK", onPress: () => {}}],
        {cancelable: true}
      );
    }
  }
}