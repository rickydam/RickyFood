import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import mainStyles from '../styles/MainStyles';
import touchableOpacity from '../styles/components/TouchableOpacity';
import firebaseFunctions from '../functions/FirebaseFunctions';
import Table from '../components/Table';
import RestaurantSelector from '../components/RestaurantSelector';
import {connect} from 'react-redux';

class RestaurantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tables: []}
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Restaurant'
  });

  componentDidMount() {
    this.reRender = this.props.navigation.addListener('didFocus', () => {
      if(this.props.redux.restaurant) {
        this.loadTables();
      }
    });
  }

  componentWillUnmount() {
    this.reRender.remove();
  }

  componentDidUpdate(prevProps) {
    if(this.props.redux.restaurant !== prevProps.redux.restaurant) {
      if(this.props.redux.restaurant !== null) {
        // case 1: object and null
        // restaurant has been selected, load the tables
        this.loadTables();
      }
      else {
        // case 2: null and object
        // restaurant cleared, clear the tables
        this.clearTables();
      }
    }
    else {
      if(this.props.redux.restaurant !== null && prevProps.redux.restaurant !== null) {
        // Make sure both, this.props and prevProps, have a non-null restaurant property before accessing it
        if(this.props.redux.restaurant.key !== prevProps.redux.restaurant.key) {
          // case 3: object and object
          // restaurant has been switched, load the tables
          this.loadTables();
        }
      }
      else {
        // case 4: null and null
        // no action required
      }
    }
  }

  render() {
    if(this.props.redux.restaurant !== null) {
      if(this.state.tables.length > 0) {
        let tables = this.state.tables.map((table) => {
          return <Table key={table.createdAt} table={table} screen={'RestaurantScreen'}/>
        });
        return (
          <View style={mainStyles.container}>
            <View style={mainStyles.buttonsContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Layout')}>
                <View style={touchableOpacity('#9932CC', 30, 10, 55).view}>
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
        <RestaurantSelector nav={this.props.navigation} />
      );
    }
  }

  loadTables = async () => {
    this.clearTables();
    let restaurantScreen = this;
    let tables = await firebaseFunctions.loadTables(restaurantScreen.props.redux.restaurant.key);
    this.setState({tables: tables});
  };

  clearTables = () => {
    this.setState({tables: []});
  };
}

const mapStateToProps = (state) => {
  const {redux} = state;
  return {redux};
};

export default connect(mapStateToProps)(RestaurantScreen);