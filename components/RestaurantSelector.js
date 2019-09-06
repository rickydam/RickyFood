import React from "react";
import {Picker, Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../functions/FirebaseFunctions";
import mainFunctions from "../functions/MainFunctions";

export default class RestaurantSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {restaurants: [], selectedRestaurant: null, userData: null}
  }

  componentDidMount() {
    let restaurantSelector = this;
    this.reRender = this.props.nav.addListener("willFocus", () => {
      this.loadRestaurants();
      mainFunctions.getItemUserData(function(userData) {
        if(userData !== null) restaurantSelector.setState({userData: userData});
      });
    });
  }

  render() {
    let createRestaurantSection = null;
    if(this.state.userData !== null) {
      if(this.state.userData.userType === "owner") {
        createRestaurantSection =
        <View>
          <Text>Create a restaurant</Text>
          <TouchableOpacity onPress={() => this.props.nav.navigate("CreateRestaurant")}>
            <View style={touchableOpacity("#2196F3", 40, 10, 60).view}>
              <Text style={touchableOpacity().text}>Create</Text>
            </View>
          </TouchableOpacity>
        </View>;
      }
    }
    let restaurantPickerItems = this.state.restaurants.map((restaurant) => {
      return <Picker.Item key={Math.random()} label={restaurant.name} value={restaurant.name} />
    });
    return (
      <View style={mainStyles.container}>
        {createRestaurantSection}
        <Text>Select a restaurant</Text>
        <View style={mainStyles.pickerView}>
          <Picker
            selectedValue={this.state.selectedRestaurant}
            style={mainStyles.picker}
            onValueChange={(value) => {
              this.setState({selectedRestaurant: value})
            }}>
            {restaurantPickerItems}
          </Picker>
        </View>
      </View>
    );
  }

  loadRestaurants = () => {
    this.state.restaurants.length = 0;
    this.setState({restaurants: this.state.restaurants});
    let restaurantSelector = this;
    firebaseFunctions.loadRestaurants(function(restaurantsObj) {
      if(restaurantsObj !== null) {
        let restaurantsKeys = Object.keys(restaurantsObj);
        restaurantsKeys.forEach(function(key) {
          restaurantSelector.state.restaurants.push(restaurantsObj[key]);
        });
        restaurantSelector.setState({restaurants: restaurantSelector.state.restaurants});
      }
    });
  };
}