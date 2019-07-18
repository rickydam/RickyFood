import React from "react";
import { Text, View } from "react-native";
import mainStyles from "../styles/MainStyles";

export default class MenuItemDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationParams: ""
    }
  }

  static navigationOptions = {
    title: "Menu Item Details"
  };

  componentDidMount() {
    this.setState({
      navigationParams: this.props.navigation.state.params
    });
  }

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>Name</Text>
        <Text>{this.state.navigationParams["name"]}</Text>
        <Text>Description</Text>
        <Text>{this.state.navigationParams["description"]}</Text>
      </View>
    );
  }
}