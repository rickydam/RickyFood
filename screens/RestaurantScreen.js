import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../functions/FirebaseFunctions";
import Table from "../components/Table";
import mainFunctions from "../functions/MainFunctions";
import RestaurantSelector from "../components/RestaurantSelector";

export default class RestaurantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedRestaurant: null, tables: []}
  }

  static navigationOptions = ({navigation}) => ({
    title: "Restaurant"
  });

  componentDidMount() {
    let restaurantScreen = this;
    this.reRender = this.props.navigation.addListener("didFocus", () => {
      mainFunctions.getItemSelectedRestaurant(function(selectedRestaurant) {
        if(selectedRestaurant !== null) {
          restaurantScreen.setState({selectedRestaurant: selectedRestaurant});
          restaurantScreen.setState({tables: []});
          restaurantScreen.loadTables();
        }
        else {
          restaurantScreen.setState({selectedRestaurant: null});
        }
      });
    });
  }

  componentWillUnmount() {
    this.reRender.remove();
  }

  render() {
    if(this.state.selectedRestaurant !== null) {
      if(this.state.tables.length > 0) {
        let tables = this.state.tables.map((table) => {
          return <Table
            key={table.createdAt}
            table={table}
            screen={"RestaurantScreen"}
          />
        });
        return (
          <View style={mainStyles.container}>
            <View style={mainStyles.buttonsContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Layout")}>
                <View style={touchableOpacity("#9932CC", 30, 10, 55).view}>
                  <Text style={touchableOpacity().text}>Layout</Text>
                </View>
              </TouchableOpacity>
            </View>
            {tables}
          </View>
        );
      }
      else {
        return (
          <View style={mainStyles.container}>
            <Text>No restaurant tables to display.</Text>
          </View>
        );
      }
    }
    else {
      return (
        <RestaurantSelector nav={this.props.navigation} restaurant={this.setSelectedRestaurant} />
      );
    }
  }

  loadTables = async () => {
    let restaurantScreen = this;
    let tables = await firebaseFunctions.loadTables(restaurantScreen.state.selectedRestaurant.key);
    this.setState({tables: tables});
  };

  setSelectedRestaurant = (selectedRestaurant) => {
    this.setState({selectedRestaurant: selectedRestaurant});
    this.loadTables();
  };
}