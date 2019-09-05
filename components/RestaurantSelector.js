import React from "react";
import {Picker, Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
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
        <Text>Create a restaurant</Text>
        <TouchableOpacity onPress={() => this.props.nav.navigate("CreateRestaurant")}>
          <View style={touchableOpacity("#2196F3", 40, 10, 60).view}>
            <Text style={touchableOpacity().text}>Create</Text>
          </View>
        </TouchableOpacity>
        <Text>Select a restaurant</Text>
        {/*<Picker>*/}
        {/*  <Picker.Item />*/}
        {/*</Picker>*/}
      </View>
    );
  }

  loadRestaurantList = () => {
  }
}