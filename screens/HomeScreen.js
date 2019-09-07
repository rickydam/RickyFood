import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import RestaurantSelector from "../components/RestaurantSelector";
import mainFunctions from "../functions/MainFunctions";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedRestaurant: null, user: null, userType: null};
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "RickyFood"
    }
  };

  componentDidMount() {
    let homeScreen = this;
    this.reRender = this.props.navigation.addListener("willFocus", () => {
      mainFunctions.getItemSelectedRestaurant(function(selectedRestaurant) {
        if(selectedRestaurant !== null) homeScreen.setState({selectedRestaurant: selectedRestaurant});
      })
    });
  }

  render() {
    if(this.state.selectedRestaurant !== null) {
      return (
        <View style={mainStyles.container}>
          <Text>{this.state.selectedRestaurant.name}</Text>
          <Text>{this.state.selectedRestaurant.owner}</Text>
          <Text>{this.state.selectedRestaurant.key}</Text>
          <TouchableOpacity onPress={() => this.clearSelectedRestaurant()}>
            <View style={touchableOpacity("#9932CC", 40, 10, 60).view}>
              <Text style={touchableOpacity().text}>Switch</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <RestaurantSelector nav={this.props.navigation} restaurant={this.setSelectedRestaurant} />
      );
    }
  };

  setSelectedRestaurant = (selectedRestaurant) => {
    this.setState({selectedRestaurant: selectedRestaurant});
  };

  clearSelectedRestaurant = () => {
    let homeScreen = this;
    mainFunctions.removeItemSelectedRestaurant(function(err) {
      if(!err) homeScreen.setState({selectedRestaurant: null});
    });
  }
}