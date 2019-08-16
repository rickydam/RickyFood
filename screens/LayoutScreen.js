import React from "react";
import {Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import layoutStyles from "../styles/LayoutStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import Table from "../components/Table";
import firebaseFunctions from "../firebase/FirebaseFunctions";

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
    this.loadTables();
    this.props.navigation.setParams({
      addTable: this.addTable,
      saveLayout: this.saveLayout
    });
  }

  render() {
    if(this.state.tables != null) {
      let tables = this.state.tables.map((table, index) => {
        return <Table
          key={index}
          index={index}
          values={[table[0], table[1], table[2]]}
          screen={"LayoutScreen"}
          callback={this.updateTableCoordinates}
          delete={this.deleteTable}
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

  addTable = () => {
    this.state.tables.push([0, 0, null]);
    this.setState({tables: this.state.tables});
  };

  updateTableCoordinates = (table) => {
    let tables = this.state.tables;
    tables.forEach(function(item, index) {
      if(item[2] === table.firebaseKey) {
        tables[table.index] = [table.x, table.y, table.firebaseKey];
      }
    });
    this.setState({tables: tables});
  };

  saveLayout = () => {
    let layoutScreen = this;
    let tables = this.state.tables;
    let count = 0;
    let successCount = 0;
    tables.forEach(function(table, index) {
      firebaseFunctions.saveTable(table, function(key, success) {
        count++;
        if(success) successCount++;
        if(key != null) {
          let theTable = tables[index];
          let x = theTable[0];
          let y = theTable[1];
          tables[index] = [x, y, key];
        }
        if(count === tables.length) {
          layoutScreen.setState({tables: tables});
          if(successCount === tables.length) {
            ToastAndroid.show("Successfully saved table layout.", ToastAndroid.LONG);
          }
          else {
            ToastAndroid.show("Unable to save table layout.", ToastAndroid.LONG);
          }
          layoutScreen.props.navigation.goBack();
        }
      });
    });
  };

  loadTables = async() => {
    let tables = await firebaseFunctions.loadTables();
    this.setState({tables: tables});
  };

  deleteTable = (firebaseKey, index) => {
    if(firebaseKey != null) {
      let layoutScreen = this;
      firebaseFunctions.deleteTable(firebaseKey, function(success) {
        if(success) {
          layoutScreen.setState({tables: []});
          layoutScreen.loadTables();
        }
      });
    }
    else {
      let tables = this.state.tables;
      this.setState({tables: []});
      this.loadTables();
    }
  };
}