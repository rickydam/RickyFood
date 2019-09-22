import React from 'react';
import {Picker, Text, TouchableOpacity, View} from 'react-native';
import mainStyles from '../styles/MainStyles';
import touchableOpacity from '../styles/components/TouchableOpacity';
import firebaseFunctions from '../functions/FirebaseFunctions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setRestaurant} from '../redux/reduxActions';

class RestaurantSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {restaurants: [], selectedRestaurant: null};
  }

  componentDidMount() {
    this.loadRestaurants();
  }

  render() {
    let createRestaurantSection = null;
    if(this.props.redux.userData !== null) {
      if(this.props.redux.userData.userType === 'owner') {
        createRestaurantSection =
        <View>
          <Text>Create a restaurant</Text>
          <TouchableOpacity onPress={() => this.props.nav.navigate('CreateRestaurant')}>
            <View style={touchableOpacity('#2196F3', 40, 10, 60).view}>
              <Text style={touchableOpacity().text}>Create</Text>
            </View>
          </TouchableOpacity>
        </View>;
      }
    }
    let restaurantPickerItems = this.state.restaurants.map((restaurant) => {
      return <Picker.Item key={Math.random()} label={restaurant.name} value={restaurant} />
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
              this.setState({selectedRestaurant: value});
            }}>
            {restaurantPickerItems}
          </Picker>
        </View>
        <TouchableOpacity onPress={() => this.props.setRestaurant(this.state.selectedRestaurant)}>
          <View style={touchableOpacity('#2196F3', 40, 10, 60).view}>
            <Text style={touchableOpacity().text}>Select</Text>
          </View>
        </TouchableOpacity>
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
          let restaurantObj = restaurantsObj[key];
          restaurantObj.key = key;
          restaurantSelector.state.restaurants.push(restaurantObj);
        });
        restaurantSelector.setState({restaurants: restaurantSelector.state.restaurants});
      }
    });
  };
}

const mapStateToProps = (state) => {
  const {redux} = state;
  return {redux};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setRestaurant
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSelector);
