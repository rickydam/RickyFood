import React from 'react';
import {RefreshControl, SectionList, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import mainStyles from '../styles/MainStyles';
import menuStyles from '../styles/MenuStyles';
import touchableOpacity from '../styles/components/TouchableOpacity';
import firebaseFunctions from '../functions/FirebaseFunctions';
import RestaurantSelector from '../components/RestaurantSelector';
import {connect} from 'react-redux';
import reduxUpdate from '../redux/reduxUpdate';

class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {appetizers: [], beverages: [], desserts: [], mains: [], refreshing: false};
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Menu'
  });

  componentDidMount() {
    this.reRender = this.props.navigation.addListener('didFocus', () => {
      if(this.props.redux.restaurant) {
        this.loadMenu();
      }
    });
  }

  componentWillUnmount() {
    this.reRender.remove();
  }

  componentDidUpdate(prevProps) {
    reduxUpdate(this.props, prevProps, this.loadMenu, this.clearMenuItems);
  }

  render() {
    if(this.props.redux.restaurant) {
      return (
        <View style={mainStyles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MenuItem', {purpose: 'Add'})}>
            <View style={touchableOpacity('#2196F3', 40, 5, 60).view}>
              <Text style={touchableOpacity().text}>Add</Text>
            </View>
          </TouchableOpacity>
          <View style={menuStyles.menuContainer}>
            <SectionList
              sections={[
                {title: 'Appetizers', data: this.state.appetizers},
                {title: 'Mains', data: this.state.mains},
                {title: 'Desserts', data: this.state.desserts},
                {title: 'Beverages', data: this.state.beverages}
              ]}
              renderItem={({item}) => (
                <TouchableHighlight
                  onPress={() => this.props.navigation.navigate('MenuItemDetails', {key: item['key']})}
                  underlayColor='black'>
                  <View>
                    <Text style={menuStyles.renderItem}>{item['name']}</Text>
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
        </View>
      );
    }
    else {
      return (
        <RestaurantSelector nav={this.props.navigation} />
      );
    }
  }

  onRefresh = () => {
    this.clearMenuItems();
    this.setState({refreshing: true});
    let menuScreen = this;
    firebaseFunctions.loadMenuItemsOnce(this, this.props.redux.restaurant.key, function() {
      menuScreen.setState({refreshing: false});
    });
  };

  loadMenuItems = () => {
    this.clearMenuItems();
    firebaseFunctions.loadMenuItems(this, this.props.redux.restaurant.key);
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

  loadMenu = () => {
    this.loadMenuItems();
    firebaseFunctions.menuItemDeletedListener(this, this.props.redux.restaurant.key);
    firebaseFunctions.menuItemChangedListener(this, this.props.redux.restaurant.key);
  }
}

const mapStateToProps = (state) => {
  const {redux} = state;
  return {redux};
};

export default connect(mapStateToProps)(MenuScreen);