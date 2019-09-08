import React from "react";
import {RefreshControl, SectionList, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import menuStyles from "../styles/MenuStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../functions/FirebaseFunctions";
import mainFunctions from "../functions/MainFunctions";
import RestaurantSelector from "../components/RestaurantSelector";

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {appetizers: [], beverages: [], desserts: [], mains: [], refreshing: false, selectedRestaurant: null};
  }

  static navigationOptions = ({navigation}) => ({
    title: "Menu Items",
    headerRight: (
      <View style={mainStyles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate("MenuItem", {purpose: "Add"})}>
          <View style={touchableOpacity("#2196F3", 40, 5, 60).view}>
            <Text style={touchableOpacity().text}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  });

  componentDidMount() {
    let menuScreen = this;
    this.reRender = this.props.navigation.addListener("didFocus", () => {
      mainFunctions.getItemSelectedRestaurant(function(selectedRestaurant) {
        if(selectedRestaurant !== null) {
          menuScreen.setState({selectedRestaurant: selectedRestaurant});
          menuScreen.loadMenu();
        }
        else {
          menuScreen.setState({selectedRestaurant: null});
        }
      });
    });
  }

  render() {
    if(this.state.selectedRestaurant !== null) {
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
                onPress={() => this.props.navigation.navigate("MenuItemDetails", {key: item["key"]})}
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
        <RestaurantSelector nav={this.props.navigation} restaurant={this.setSelectedRestaurant} />
      );
    }
  }

  onRefresh = () => {
    this.clearMenuItems();
    this.setState({refreshing: true});
    let menuScreen = this;
    firebaseFunctions.loadMenuItemsOnce(this, this.state.selectedRestaurant.key, function() {
      menuScreen.setState({refreshing: false});
    });
  };

  loadMenuItems = () => {
    this.clearMenuItems();
    firebaseFunctions.loadMenuItems(this, this.state.selectedRestaurant.key);
  };

  clearMenuItems = () => {
    this.state.appetizers.length = 0;
    this.state.beverages.length = 0;
    this.state.desserts.length = 0;
    this.state.mains.length = 0;
    this.setState({
      appetizers: this.state.appetizers,
      beverages: this.state.beverages,
      desserts: this.state.desserts,
      mains: this.state.mains
    });
  };

  setSelectedRestaurant = (selectedRestaurant) => {
    this.setState({selectedRestaurant: selectedRestaurant});
    this.loadMenu();
  };

  loadMenu = () => {
    this.loadMenuItems();
    firebaseFunctions.menuItemDeletedListener(this, this.state.selectedRestaurant.key);
    firebaseFunctions.menuItemChangedListener(this, this.state.selectedRestaurant.key);
  }
}