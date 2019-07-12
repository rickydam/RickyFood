import React, { Component } from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

export default class Rlagu extends Component {
  constructor(props) {
    super(props);
    initializeFirebase();
  }
  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Alert.alert("Menu", "Food items")}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>View Menu</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#428BCA',
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
    width: 120,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

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