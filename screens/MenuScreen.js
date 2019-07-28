import React from "react";
import { RefreshControl, SectionList, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import firebase from "firebase";
import mainStyles from "../styles/MainStyles";
import menuStyles from "../styles/MenuStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appetizers: [],
      beverages: [],
      desserts: [],
      mains: [],
      isDoneFetchingMenu: false,
      refreshing: false
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: "Menu Items",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("MenuItem", {purpose: "Add"})}>
        <View style={touchableOpacity("#2196F3", 40, 10, 60).view}>
          <Text style={touchableOpacity().text}>Add</Text>
        </View>
      </TouchableOpacity>
    )
  });

  componentDidMount() {
    this.reRender = this.props.navigation.addListener("willFocus", () => {
      this.loadMenuItems();
    });
  }

  componentWillUnmount() {
    this.reRender.remove();
  }

  render() {
    if(this.state.isDoneFetchingMenu) {
      const {navigate} = this.props.navigation;
      return (
        <View style={mainStyles.container}>
          <SectionList
            sections={[
              {title: "Appetizers", data: this.state.appetizers},
              {title: "Mains", data: this.state.mains},
              {title: "Desserts", data: this.state.desserts},
              {title: "Beverages", data: this.state.beverages}
            ]}
            renderItem={({item}) => (
              <TouchableHighlight
                onPress={() => navigate("MenuItemDetails", {
                  id: item["id"],
                  type: item["type"],
                  name: item["name"],
                  description: item["description"]
                })}
                underlayColor="black">
                <View>
                  <Text style={menuStyles.renderItem}>{item["name"]}</Text>
                </View>
              </TouchableHighlight>
            )}
            renderSectionHeader={({section}) => <Text style={menuStyles.renderSectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          />
        </View>
      );
    }
    else {
      return (
        <View style={mainStyles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
  }

  onRefresh = () => {

    this.setState({refreshing: true});
    this.loadMenuItems().then(() => {
      this.setState({refreshing: false});
    });
  };

  loadMenuItems = async () => {
    let menuScreen = this;

    this.clearMenuItems();

    let loadAppetizers = firebase.database().ref("appetizer/").once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let appetizer = {};
        appetizer["id"] = childSnapshot.key;
        appetizer["type"] = childSnapshot.val().type;
        appetizer["name"] = childSnapshot.val().name;
        appetizer["description"] = childSnapshot.val().description;
        menuScreen.state.appetizers.push(appetizer);
      });
    });

    let loadBeverages = firebase.database().ref("beverage/").once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let beverage = {};
        beverage["id"] = childSnapshot.key;
        beverage["type"] = childSnapshot.val().type;
        beverage["name"] = childSnapshot.val().name;
        beverage["description"] = childSnapshot.val().description;
        menuScreen.state.beverages.push(beverage);
      });
    });

    let loadDesserts = firebase.database().ref("dessert/").once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let dessert = {};
        dessert["id"] = childSnapshot.key;
        dessert["type"] = childSnapshot.val().type;
        dessert["name"] = childSnapshot.val().name;
        dessert["description"] = childSnapshot.val().description;
        menuScreen.state.desserts.push(dessert);
      });
    });

    let loadMains = firebase.database().ref("main/").once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let main = {};
        main["id"] = childSnapshot.key;
        main["type"] = childSnapshot.val().type;
        main["name"] = childSnapshot.val().name;
        main["description"] = childSnapshot.val().description;
        menuScreen.state.mains.push(main);
      });
    });

    await Promise.all([loadAppetizers, loadBeverages, loadDesserts, loadMains]);

    this.setState({isDoneFetchingMenu: true});
  };

  clearMenuItems = () => {
    this.setState({
      appetizers: [],
      beverages: [],
      desserts: [],
      mains: [],
      isDoneFetchingMenu: false
    });
  }
}