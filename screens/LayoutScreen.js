import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import firebase from "firebase";
import mainStyles from "../styles/MainStyles";
import layoutStyles from "../styles/LayoutStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import Table from "../components/Table";

export default class LayoutScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tables: []
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: "Layout",
    headerRight: (
      <View style={layoutStyles.header}>
        <TouchableOpacity onPress={() => navigation.state.params.addTable()}>
          <View style={touchableOpacity("#9932CC", 40, 5, 60).view}>
            <Text style={touchableOpacity().text}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.state.params.saveLayout()}>
          <View style={touchableOpacity("#9932CC", 40, 5, 60).view}>
            <Text style={touchableOpacity().text}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  });

  componentDidMount() {
    this.props.navigation.setParams({
      addTable: this.addTable,
      saveLayout: this.saveLayout
    });
  }

  render() {
    let tables = this.state.tables.map((table, index) => {
      return <Table key={index} id={index} values={[table[0], table[1]]} screen={"layout"} callback={this.updateTableCoordinates} />
    });

    return (
      <View style={mainStyles.container}>
        {tables}
      </View>
    );
  }

  addTable = () => {
    this.state.tables.push([0, 0]);
    this.setState({
      tables: this.state.tables
    });
  };

  updateTableCoordinates = (table) => {
    let tables = this.state.tables;
    tables[table.key] = [table.x, table.y];
    this.setState({
      tables: tables
    });
  };

  saveLayout = () => {
    firebase.database().ref("tables/").set({
      restaurant1: this.state.tables
    })
  };
}