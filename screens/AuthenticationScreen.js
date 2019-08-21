import React from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class AuthenticationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      errorMessage: null
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
          {this.state.errorMessage && <Text style={{color: "red"}}>{this.state.errorMessage}</Text>}
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
          {this.state.errorMessage && <Text style={{color: "red"}}>{this.state.errorMessage}</Text>}
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
}