import React from "react";
import {Text, View} from "react-native";
import mainStyles from "../styles/MainStyles";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "RickyFood"
    }
  };

  componentDidMount() {}

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>HomeScreen</Text>
      </View>
    );
  };
}