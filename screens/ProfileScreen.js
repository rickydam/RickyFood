import React from 'react';
import {Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import mainStyles from '../styles/MainStyles';
import touchableOpacity from '../styles/components/TouchableOpacity';
import firebaseFunctions from '../functions/FirebaseFunctions';
import mainFunctions from '../functions/MainFunctions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setUserData} from '../redux/reduxActions';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null, userData: null}
  }

  static navigationOptions = {
    title: 'Profile'
  };

  componentDidMount() {
    let profileScreen = this;
    this.reRender = this.props.navigation.addListener('willFocus', () => {
      this.checkUserAuthentication();
      mainFunctions.getItemUserData(function(userData) {
        if(userData !== null) profileScreen.setState({userData: userData});
      });
    });
    this.props.navigation.setParams({
      logout: this.logout
    });
  }

  render() {
    if(this.state.user) {
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
            {this.state.user ? <Text>{this.state.user.email}</Text> : null}
            {this.state.userData ? <Text>{this.state.userData.userId}</Text> : null }
            {this.state.userData ? <Text>{this.state.userData.userType}</Text> : null }
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

  checkUserAuthentication = () => {
    firebaseFunctions.checkUserAuthentication(user => {
      this.setState({user: user});
    });
  };

  logout = () => {
    let profileScreen = this;
    firebaseFunctions.logout(function() {
      ToastAndroid.show('Logout successful.', ToastAndroid.LONG);
      profileScreen.setState({user: null});
      mainFunctions.removeItemUserData(function(err) {
        if(!err) {
          profileScreen.props.setUserData(null);
          profileScreen.setState({userData: null});
        }
      });
    })
  };
}

const mapStateToProps = (state) => {
  const {reduxUserAuthentication} = state;
  return {reduxUserAuthentication};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUserData
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);