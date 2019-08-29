import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../firebase/FirebaseFunctions";
import Table from "../components/Table";

export default class RestaurantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: []
    }
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
    this.reRender = this.props.navigation.addListener("willFocus", () => {
      this.setState({tables: []});
      this.loadTables();
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