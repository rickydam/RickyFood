import React from "react";
import {View} from "react-native";
import mainStyles from "../styles/MainStyles";
import RestaurantSelector from "../components/RestaurantSelector";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {restaurant: null, user: null, userType: null};
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "RickyFood"
    }
  };

  componentDidMount() {}

  render() {
    if(this.state.restaurant !== null) {
      return (
        <View style={mainStyles.container}>
        </View>
      );
    }
    else {
      return (
        <RestaurantSelector nav={this.props.navigation} restaurant={this.setRestaurant} />
      );
    }
  };

  setRestaurant = (restaurant) => {
    this.setState({restaurant: restaurant});
  }
}