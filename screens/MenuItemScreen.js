import React from "react";
import {Picker, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import addMenuItemStyles from "../styles/MenuItemStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../firebase/FirebaseFunctions";

export default class MenuItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "appetizer",
      name: "",
      description: ""
    };
  }

  componentDidMount() {
    if(this.props.navigation.state.params["purpose"] === "Edit") {
      this.setState({
        type: this.props.navigation.state.params["type"],
        name: this.props.navigation.state.params["name"],
        description: this.props.navigation.state.params["description"]
      });
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params["purpose"]
  });

  render() {
    return (
      <View style={mainStyles.container}>
        <View style={addMenuItemStyles.fieldContainer}>
          <Text style={addMenuItemStyles.textInputLabel}>Type</Text>
          <View style={addMenuItemStyles.pickerView}>
            <Picker
              onValueChange={(itemValue) => this.setState({type: itemValue})}
              selectedValue={this.state.type}
              style={addMenuItemStyles.picker}>
              <Picker.Item label="Appetizer" value="appetizer" />
              <Picker.Item label="Main" value="main" />
              <Picker.Item label="Dessert" value="dessert" />
              <Picker.Item label="Beverage" value="beverage" />
            </Picker>
          </View>
        </View>
        <View style={addMenuItemStyles.fieldContainer}>
          <Text style={addMenuItemStyles.textInputLabel}>Name</Text>
          <TextInput
            onChangeText={(name) => this.setState({name})}
            style={addMenuItemStyles.textInput}
            value={this.state.name}
          />
        </View>
        <View style={addMenuItemStyles.fieldContainer}>
          <Text style={addMenuItemStyles.textInputLabel}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={3}
            onChangeText={(description) => this.setState({description})}
            style={[addMenuItemStyles.textInput, addMenuItemStyles.alignTop]}
            value={this.state.description}
          />
        </View>
        <TouchableOpacity onPress={() => this.saveButtonPressed()}>
          <View style={touchableOpacity("#2196F3", 40, 10, 60).view}>
            <Text style={touchableOpacity().text}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  saveButtonPressed = () => {
    if(this.props.navigation.state.params["purpose"] === "Add") this.addMenuItem();
    else if(this.props.navigation.state.params["purpose"] === "Edit") this.editMenuItem();
    else {}
  };

  addMenuItem = async () => {
    let type = this.state.type;
    let name = this.state.name;
    let description = this.state.description;
    if(await firebaseFunctions.addMenuItem(type, name, description)) {
      ToastAndroid.show("Successfully added: " + name, ToastAndroid.LONG);
      this.props.navigation.goBack();
      this.resetState();
    }
    else {
      ToastAndroid.show("Unable to add menu item: " + name, ToastAndroid.LONG);
    }
  };

  editMenuItem = () => {
    let menuItemScreen = this;
    let key = this.props.navigation.state.params.key;
    let type = this.state.type;
    let name = this.state.name;
    let description = this.state.description;
    if(firebaseFunctions.editMenuItem(menuItemScreen, key, type, name, description)) {
      this.resetState();
    }
  };

  resetState = () => {
    this.setState({
      type: "appetizer",
      name: "",
      description: ""
    })
  };
}