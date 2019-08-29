import React from "react";
import {Image, YellowBox} from "react-native";
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";
import AuthenticationScreen from "./screens/AuthenticationScreen";
import HomeScreen from "./screens/HomeScreen";
import LayoutScreen from "./screens/LayoutScreen";
import MenuScreen from "./screens/MenuScreen";
import MenuItemScreen from "./screens/MenuItemScreen";
import MenuItemDetailsScreen from "./screens/MenuItemDetailsScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import mainStyles from "./styles/MainStyles";

const menuIcon = require("./images/icons/menu.png");

const MenuStackNavigator = createStackNavigator({
  Authentication: AuthenticationScreen,
  Menu: MenuScreen,
  MenuItem: MenuItemScreen,
  MenuItemDetails: MenuItemDetailsScreen
}, {
  initialRouteName: "Menu",
  navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image source={menuIcon} style={[mainStyles.icon, {tintColor: tintColor}]} />
    ),
    tabBarLabel: "Menu"
  }
});

const TabNavigator = createBottomTabNavigator({
  HomeScreen: HomeScreen,
  Menu: MenuStackNavigator,
  OrderScreen: OrderScreen,
  RestaurantScreen: RestaurantScreen,
  ProfileScreen: ProfileScreen
}, {
  tabBarOptions: {
    activeTintColor: "black",
    inactiveTintColor: "lightgray"
  }
});

const AppNavigator = createStackNavigator({
  Authentication: AuthenticationScreen,
  Home: HomeScreen,
  Layout: LayoutScreen,
  Menu: MenuScreen,
  MenuItem: MenuItemScreen,
  MenuItemDetails: MenuItemDetailsScreen,
  Order: OrderScreen,
  Restaurant: RestaurantScreen
}, {
  initialRouteName: "Home"
});
const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

YellowBox.ignoreWarnings(["Setting a timer"]);
YellowBox.ignoreWarnings(["Remote debugger"]);