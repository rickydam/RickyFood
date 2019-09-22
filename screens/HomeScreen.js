import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import mainStyles from '../styles/MainStyles';
import touchableOpacity from '../styles/components/TouchableOpacity';
import RestaurantSelector from '../components/RestaurantSelector';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setRestaurant} from '../redux/reduxActions';

class HomeScreen extends React.Component {
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
    if(this.props.redux.restaurant !== null) {
      return (
        <View style={mainStyles.container}>
          {this.props.redux.restaurant ? <Text>Name: {this.props.redux.restaurant.name}</Text> : null}
          {this.props.redux.restaurant ? <Text>Key: {this.props.redux.restaurant.key}</Text> : null}
          {this.props.redux.restaurant ? <Text>Owner: {this.props.redux.restaurant.owner}</Text> : null}
          <TouchableOpacity onPress={() => this.props.setRestaurant(null)}>
            <View style={touchableOpacity('#9932CC', 40, 10, 60).view}>
              <Text style={touchableOpacity().text}>Switch</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <RestaurantSelector nav={this.props.navigation} />
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);