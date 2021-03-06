import React from 'react';
import {Picker, Text, TextInput, ToastAndroid, TouchableOpacity, View} from 'react-native';
import mainStyles from '../styles/MainStyles';
import touchableOpacity from '../styles/components/TouchableOpacity';
import firebaseFunctions from '../functions/FirebaseFunctions';
import {connect} from 'react-redux';

class MenuItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {type: 'appetizer', name: '', description: ''};
  }

  componentDidMount() {
    if(this.props.navigation.state.params['purpose'] === 'Edit') {
      this.setState({
        type: this.props.navigation.state.params['type'],
        name: this.props.navigation.state.params['name'],
        description: this.props.navigation.state.params['description']
      });
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params['purpose']
  });

  render() {
    return (
      <View style={mainStyles.container}>
        <Text>Type</Text>
        <View style={mainStyles.pickerView}>
          <Picker
            onValueChange={(itemValue) => this.setState({type: itemValue})}
            selectedValue={this.state.type}
            style={mainStyles.picker}>
            <Picker.Item label='Appetizer' value='appetizer' />
            <Picker.Item label='Main' value='main' />
            <Picker.Item label='Dessert' value='dessert' />
            <Picker.Item label='Beverage' value='beverage' />
          </Picker>
        </View>
        <Text>Name</Text>
        <TextInput
          onChangeText={(name) => this.setState({name})}
          style={mainStyles.textInput}
          value={this.state.name}
        />
        <Text>Description</Text>
        <TextInput
          multiline={true}
          numberOfLines={3}
          onChangeText={(description) => this.setState({description})}
          style={[mainStyles.textInput, mainStyles.alignTop]}
          value={this.state.description}
        />
        <TouchableOpacity onPress={() => this.saveButtonPressed()}>
          <View style={touchableOpacity('#2196F3', 40, 10, 60).view}>
            <Text style={touchableOpacity().text}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  saveButtonPressed = () => {
    if(this.props.navigation.state.params['purpose'] === 'Add') this.addMenuItem();
    else if(this.props.navigation.state.params['purpose'] === 'Edit') this.editMenuItem();
    else {}
  };

  addMenuItem = async () => {
    let menuItemScreen = this;
    let menuItemObj = {type: this.state.type, name: this.state.name, description: this.state.description};
    if(this.props.redux.restaurant) {
      if(await firebaseFunctions.addMenuItem(menuItemObj, menuItemScreen.props.redux.restaurant.key)) {
        ToastAndroid.show('Successfully added: ' + menuItemScreen.state.name, ToastAndroid.LONG);
        menuItemScreen.props.navigation.goBack();
        menuItemScreen.resetState();
      }
      else {
        ToastAndroid.show('Unable to add menu item: ' + this.state.name, ToastAndroid.LONG);
      }
    }
    else {
      ToastAndroid.show('Unable to add menu item: ' + this.state.name, ToastAndroid.LONG);
    }
  };

  editMenuItem = () => {
    let menuItemScreen = this;
    let menuItemKey = this.props.navigation.state.params.key;
    let menuItemObj = {type: this.state.type, name: this.state.name, description: this.state.description};
    let restaurantKey = this.props.redux.restaurant.key;
    if(firebaseFunctions.editMenuItem(menuItemScreen, menuItemKey, menuItemObj, restaurantKey)) {
      this.resetState();
    }
  };

  resetState = () => {
    this.setState({
      type: 'appetizer',
      name: '',
      description: ''
    })
  };
}

const mapStateToProps = (state) => {
  const {redux} = state;
  return {redux};
};

export default connect(mapStateToProps)(MenuItemScreen);