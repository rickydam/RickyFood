import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import mainStyles from '../styles/MainStyles';
import touchableOpacity from '../styles/components/TouchableOpacity';
import RestaurantSelector from '../components/RestaurantSelector';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'RickyFood'
    }
  };

  componentDidMount() {}

  render() {
    if(this.state.selectedRestaurant !== null) {
      return (
        <View style={mainStyles.container}>
          <TouchableOpacity onPress={() => this.clearSelectedRestaurant()}>
            <View style={touchableOpacity('#9932CC', 40, 10, 60).view}>
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

  clearSelectedRestaurant = () => {};
}