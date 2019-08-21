import React from "react";
import {YellowBox} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import firebase from "firebase";
import AuthenticationScreen from "./screens/AuthenticationScreen";
import HomeScreen from "./screens/HomeScreen";
import LayoutScreen from "./screens/LayoutScreen";
import MenuScreen from "./screens/MenuScreen";
import MenuItemScreen from "./screens/MenuItemScreen";
import MenuItemDetailsScreen from "./screens/MenuItemDetailsScreen";
import OrderScreen from "./screens/OrderScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import {API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, MESSAGING_SENDER_ID, APP_ID} from "react-native-dotenv";

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
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    initializeFirebase();
    return (
      <AppContainer />
    );
  }
}

YellowBox.ignoreWarnings(["Setting a timer"]);
YellowBox.ignoreWarnings(["Remote debugger"]);

function initializeFirebase() {
  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    storageBucket: "",
    projectId: PROJECT_ID,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
  };
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}