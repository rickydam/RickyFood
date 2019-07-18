import React from "react";
import { Text, View } from "react-native";
import mainStyles from "../styles/MainStyles";

export default class MenuItemDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: ""
    }
  }

  static navigationOptions = {
    title: "Menu Item Details"
  };

  componentDidMount() {
    this.setState({
      values: this.props.navigation.state.params
    });
  }

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>Name</Text>
        <Text>{this.state.values["name"]}</Text>
        <Text>Description</Text>
        <Text>{this.state.values["description"]}</Text>
      </View>
    );
  }
}