import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import mainStyles from '../styles/MainStyles';
import touchableOpacity from '../styles/components/TouchableOpacity';
import {connect} from 'react-redux';

class OrderScreen extends React.Component {
  static navigationOptions = {
    title: 'Order'
  };

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>OrderScreen</Text>
        <TouchableOpacity onPress={() => console.log(this.props)}>
          <View style={touchableOpacity('#9932CC', 30, 10, 55).view}>
            <Text style={touchableOpacity().text}>Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {reduxUserAuthentication} = state;
  return {reduxUserAuthentication};
};

export default connect(mapStateToProps)(OrderScreen);