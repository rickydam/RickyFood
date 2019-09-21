import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reduxReducer from './redux/reduxReducer';

import AuthenticationScreen from './screens/AuthenticationScreen';
import CreateRestaurantScreen from './screens/CreateRestaurantScreen';
import HomeScreen from './screens/HomeScreen';
import LayoutScreen from './screens/LayoutScreen';
import MenuScreen from './screens/MenuScreen';
import MenuItemScreen from './screens/MenuItemScreen';
import MenuItemDetailsScreen from './screens/MenuItemDetailsScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import RestaurantScreen from './screens/RestaurantScreen';

import mainStyles from './styles/MainStyles';

const homeIcon = require('./images/icons/home.png');
const menuIcon = require('./images/icons/menu.png');
const orderIcon = require('./images/icons/order.png');
const restaurantIcon = require('./images/icons/restaurant.png');
const profileIcon = require('./images/icons/profile.png');

const HomeStackNavigator = createStackNavigator({
  CreateRestaurant: CreateRestaurantScreen,
  Home: HomeScreen
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image source={homeIcon} style={[mainStyles.icon, {tintColor: tintColor}]} />
    ),
    tabBarLabel: 'Home'
  }
});

const MenuStackNavigator = createStackNavigator({
  Authentication: AuthenticationScreen,
  Menu: MenuScreen,
  MenuItem: MenuItemScreen,
  MenuItemDetails: MenuItemDetailsScreen
}, {
  initialRouteName: 'Menu',
  navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image source={menuIcon} style={[mainStyles.icon, {tintColor: tintColor}]} />
    ),
    tabBarLabel: 'Menu'
  }
});

const OrderStackNavigator = createStackNavigator({
  Order: OrderScreen
}, {
  initialRouteName: 'Order',
  navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image source={orderIcon} style={[mainStyles.icon, {tintColor: tintColor}]} />
    ),
    tabBarLabel: 'Order'
  }
});

const RestaurantStackNavigator = createStackNavigator({
  Layout: LayoutScreen,
  Restaurant: RestaurantScreen
}, {
  initialRouteName: 'Restaurant',
  navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image source={restaurantIcon} style={[mainStyles.icon, {tintColor: tintColor}]} />
    ),
    tabBarLabel: 'Restaurant'
  }
});

const ProfileStackNavigator = createStackNavigator({
  Authentication: AuthenticationScreen,
  Profile: ProfileScreen
}, {
  initialRouteName: 'Profile',
  navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image source={profileIcon} style={[mainStyles.icon, {tintColor: tintColor}]} />
    ),
    tabBarLabel: 'Profile'
  }
});

const TabNavigator = createBottomTabNavigator({
  Home: HomeStackNavigator,
  Menu: MenuStackNavigator,
  Order: OrderStackNavigator,
  Restaurant: RestaurantStackNavigator,
  Profile: ProfileStackNavigator
}, {
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'lightgray'
  }
});

const AppContainer = createAppContainer(TabNavigator);

const store = createStore(reduxReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

console.disableYellowBox  = true;
