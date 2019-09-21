import React from 'react';
import {Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import mainStyles from '../styles/MainStyles';
import touchableOpacity from '../styles/components/TouchableOpacity';
import firebaseFunctions from '../functions/FirebaseFunctions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setUserData} from '../redux/reduxActions';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Profile'
  };

  componentDidMount() {
    this.props.navigation.setParams({
      logout: this.logout
    });
  }

  render() {
    if(this.props.redux.userData) {
      return (
        <View style={mainStyles.container}>
          <View style={mainStyles.row}>
            <TouchableOpacity onPress={() => this.props.navigation.state.params.logout()}>
              <View style={touchableOpacity('#707070', 40, 5, 60).view}>
                <Text style={touchableOpacity().text}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {this.props.redux.userData.userId ? <Text>{this.props.redux.userData.userId}</Text> : null }
            {this.props.redux.userData.userType ? <Text>{this.props.redux.userData.userType}</Text> : null }
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={mainStyles.container}>
          <View style={mainStyles.row}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Authentication', {purpose: 'Register'})}>
              <View style={touchableOpacity('#707070', 40, 5, 70).view}>
                <Text style={touchableOpacity().text}>Register</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Authentication', {purpose: 'Login'})}>
              <View style={touchableOpacity('#707070', 40, 5, 60).view}>
                <Text style={touchableOpacity().text}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  logout = () => {
    let profileScreen = this;
    firebaseFunctions.logout(function() {
      ToastAndroid.show('Logout successful.', ToastAndroid.LONG);
      profileScreen.props.setUserData(null);
    })
  };
}

const mapStateToProps = (state) => {
  const {redux} = state;
  return {redux};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUserData
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);