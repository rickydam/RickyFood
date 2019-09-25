import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import mainStyles from '../styles/MainStyles';
import touchableOpacity from '../styles/components/TouchableOpacity';
import firebaseFunctions from '../functions/FirebaseFunctions';
import {connect} from 'react-redux';

class CreateRestaurantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {restaurantName: null}
  }

  static navigationOptions = {
    title: 'Create Restaurant'
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>Restaurant Name</Text>
        <TextInput
          onChangeText={(restaurantName) => this.setState({restaurantName: restaurantName})}
          placeholder='Restaurant Name'
          style={mainStyles.textInput}
          value={this.state.restaurantName}
        />
        <TouchableOpacity onPress={() => this.createRestaurant()}>
          <View style={touchableOpacity('#2196F3', 40, 10, 60).view}>
            <Text style={touchableOpacity().text}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  createRestaurant = () => {
    if(this.props.redux.userData) {
      if(this.props.redux.userData.userType === 'owner') {
        firebaseFunctions.createRestaurant(this, this.state.restaurantName, this.props.redux.userData);
      }
    }
  };
}

const mapStateToProps = (state) => {
  const {redux} = state;
  return {redux};
};

export default connect(mapStateToProps)(CreateRestaurantScreen);