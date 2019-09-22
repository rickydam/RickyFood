import React from 'react';
import {Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import mainStyles from '../styles/MainStyles';
import touchableOpacity from '../styles/components/TouchableOpacity';
import Table from '../components/Table';
import firebaseFunctions from '../functions/FirebaseFunctions';
import mainFunctions from '../functions/MainFunctions';
import RestaurantSelector from '../components/RestaurantSelector';

export default class LayoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedRestaurant: null, tables: []};
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Layout'
  });

  componentDidMount() {
    let layoutScreen = this;
    this.reRender = this.props.navigation.addListener('didFocus', () => {
      mainFunctions.getItemSelectedRestaurant(function(selectedRestaurant) {
        if(selectedRestaurant !== null) {
          layoutScreen.setState({selectedRestaurant: selectedRestaurant});
          layoutScreen.loadTables();
        }
        else {
          layoutScreen.setState({selectedRestaurant: null});
        }
      });
  }

  render() {
    if(this.state.selectedRestaurant) {
      if(this.state.tables.length > 0) {
        let tables = this.state.tables.map((table) => {
          return <Table
            key={table.createdAt}
            table={table}
            screen={'LayoutScreen'}
            updateTableCoordinates={this.updateTableCoordinates}
            deleteTable={this.deleteTable}
          />
        });
        return (
          <View style={mainStyles.container}>
            <View style={[mainStyles.row, mainStyles.buttonsContainer]}>
              <TouchableOpacity onPress={() => this.addTable()}>
                <View style={touchableOpacity('#9932CC', 30, 5, 50).view}>
                  <Text style={touchableOpacity().text}>Add</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.saveLayout()}>
                <View style={touchableOpacity('#9932CC', 30, 5, 50).view}>
                  <Text style={touchableOpacity().text}>Save</Text>
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

  addTable = () => {
    this.state.tables.push({x: 0, y: 0, firebaseKey: null, createdAt: Date.now()});
    this.setState({tables: this.state.tables});
  };

  updateTableCoordinates = (updatedTable) => {
    let tables = this.state.tables;
    tables.forEach(function(table, index) {
      if(table.createdAt === updatedTable.createdAt) {
        tables[index].x = updatedTable.x;
        tables[index].y = updatedTable.y;
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
      firebaseFunctions.saveTable(layoutScreen.state.selectedRestaurant.key, table, function(success) {
        count++;
        if(success) successCount++;
        if(count === tables.length) {
          layoutScreen.setState({tables: tables});
          if(successCount === tables.length) {
            ToastAndroid.show('Successfully saved table layout.', ToastAndroid.LONG);
          }
          else {
            ToastAndroid.show('Unable to save table layout.', ToastAndroid.LONG);
          }
          layoutScreen.props.navigation.goBack();
        }
      });
    });
  };

  loadTables = async() => {
    let layoutScreen = this;
    let tables = await firebaseFunctions.loadTables(layoutScreen.state.selectedRestaurant.key);
    this.setState({tables: tables});
  };

  deleteTable = (firebaseKey) => {
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

  setSelectedRestaurant = (selectedRestaurant) => {
    this.setState({selectedRestaurant: selectedRestaurant});
    this.loadTables();
  };
}