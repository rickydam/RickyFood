import React from "react";
import {Picker, Text, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import firebaseFunctions from "../functions/FirebaseFunctions";

export default class RestaurantSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {restaurantList: []}
  }

  componentDidMount() {
    this.loadRestaurantList();
  }

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>Select a restaurant</Text>
        <Picker>
          <Picker.Item />
        </Picker>
      </View>
    );
  }

  loadRestaurantList = () => {
  }
}