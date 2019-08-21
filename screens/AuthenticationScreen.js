import React from "react";
import {Text, TextInput, View} from "react-native";
import mainStyles from "../styles/MainStyles";

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
        </View>
      );
    }
  }
}