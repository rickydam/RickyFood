import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../functions/FirebaseFunctions";
import Table from "../components/Table";
import mainFunctions from "../functions/MainFunctions";

export default class RestaurantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedRestaurant: null, tables: []}
  }

  static navigationOptions = ({navigation}) => ({
    title: "Restaurant",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("Layout")}>
        <View style={touchableOpacity("#9932CC", 40, 10, 60).view}>
          <Text style={touchableOpacity().text}>Layout</Text>
        </View>
      </TouchableOpacity>
    )
  });

  componentDidMount() {
    let restaurantScreen = this;
    this.reRender = this.props.navigation.addListener("willFocus", () => {
      mainFunctions.getItemSelectedRestaurant(function(selectedRestaurant) {
        if(selectedRestaurant !== null) {
          restaurantScreen.setState({selectedRestaurant: selectedRestaurant});
          restaurantScreen.setState({tables: []});
          restaurantScreen.loadTables();
        }
      });
    });
  }

  componentWillUnmount() {
    this.reRender.remove();
  }

  render() {
    if(this.state.tables != null) {
      let tables = this.state.tables.map((table) => {
        return <Table
          key={table.createdAt}
          table={table}
          screen={"RestaurantScreen"}
        />
      });
      return (
        <View style={mainStyles.container}>
          {tables}
        </View>
      );
    }
    else {
      return (
        <View style={mainStyles.container}>
        </View>
      );
    }
  }

  loadTables = async () => {
    let tables = await firebaseFunctions.loadTables();
    this.setState({tables: tables});
  };
}