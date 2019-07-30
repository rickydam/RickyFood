import React from "react";
import { YellowBox } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import firebase from "firebase";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import MenuItemScreen from "./screens/MenuItemScreen";
import MenuItemDetailsScreen from "./screens/MenuItemDetailsScreen";
import RestaurantScreen from "./screens/RestaurantScreen";

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Menu: MenuScreen,
  MenuItem: MenuItemScreen,
  MenuItemDetails: MenuItemDetailsScreen,
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
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: "https://rlagu-a72a5.firebaseio.com",
    storageBucket: "",
    projectId: process.env.PROJECT_ID,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  };
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}