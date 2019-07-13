import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import firebase from 'firebase';
import HomeScreen from "./screens/HomeScreen";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
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