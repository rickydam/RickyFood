import React from "react";
import {Alert, Picker, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../firebase/FirebaseFunctions";

export default class AuthenticationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "customer",
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
          <Text>Type</Text>
          <View style={mainStyles.pickerView}>
            <Picker
              style={mainStyles.picker}
              selectedValue={this.state.type}
              onValueChange={(value) => {
                this.setState({type: value})
              }}>
              <Picker.Item label="Customer" value="customer" />
              <Picker.Item label="Owner" value="owner" />
            </Picker>
          </View>
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
          <TouchableOpacity onPress={() => this.register()}>
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
          <TouchableOpacity onPress={() => this.login()}>
            <View style={touchableOpacity("#2196F3", 40, 5, 60).view}>
              <Text style={touchableOpacity().text}>{this.props.navigation.state.params.purpose}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  register = () => {
    let authenticationScreen = this;
    if(this.state.email != null) {
      if(this.state.password != null) {
        firebaseFunctions.register(this.state.email, this.state.password, function(userCredentials, err) {
          if(err === null) {
            ToastAndroid.show("Registration successful.", ToastAndroid.LONG);
            firebaseFunctions.saveUserType(authenticationScreen.state.type, userCredentials.user.uid, function(err) {
              if(err === null) authenticationScreen.props.navigation.goBack();
              else ToastAndroid.show("Error saving user type.", ToastAndroid.LONG)
            });
          }
          else if(err.code === "auth/weak-password") {
            authenticationScreen.createSimpleAlert("Password too short", err.message);
          }
          else if(err.code === "auth/invalid-email") {
            authenticationScreen.createSimpleAlert("Invalid email", err.message);
          }
          else if(err.code === "auth/email-already-in-use") {
            authenticationScreen.createSimpleAlert("Email exists", err.message);
          }
          else {
            authenticationScreen.createSimpleAlert("Register error", "Unable to register account.");
          }
        });
      }
      else {
        authenticationScreen.createSimpleAlert("Blank password", "Please provide a password.");
      }
    }
    else {
      authenticationScreen.createSimpleAlert("Blank email", "Please provide an email.");
    }
  };

  login = () => {
    let authenticationScreen = this;
    if(this.state.email != null) {
      if(this.state.password != null) {
        firebaseFunctions.login(this.state.email, this.state.password, function(userCredentials, err) {
          if(err === null) {
            ToastAndroid.show("Login successful.", ToastAndroid.LONG);
            firebaseFunctions.getUserType(userCredentials.user.uid, function() {
              authenticationScreen.props.navigation.goBack();
            });
          }
          else if(err.code === "auth/invalid-email") {
            authenticationScreen.createSimpleAlert("Invalid email", err.message);
          }
          else if(err.code === "auth/user-not-found") {
            authenticationScreen.createSimpleAlert("User not found", err.message);
          }
          else if(err.code === "auth/wrong-password") {
            authenticationScreen.createSimpleAlert("Wrong password", err.message);
          }
          else {
            authenticationScreen.createSimpleAlert("Login error", "Unable to login to this account.");
          }
        });
      }
      else {
        authenticationScreen.createSimpleAlert("Blank password", "Please provide a password.");
      }
    }
    else {
      authenticationScreen.createSimpleAlert("Blank email", "Please provide an email.");
    }
  };

  createSimpleAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: "OK", onPress: () => {}}],
      {cancelable: true}
    );
  };
}