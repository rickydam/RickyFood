import React from "react";
import {ToastAndroid} from "react-native";
import firebase from "firebase";

module.exports = {
  loadMenuItems: (menuScreen) => {
    let menuObj = {
      appetizers: [],
      beverages: [],
      desserts: [],
      mains: []
    };
    firebase.database().ref("menu").on("child_added", function(snapshot) {
      if(snapshot.val().type === "appetizer") {
        let appetizer = {};
        appetizer["id"] = snapshot.key;
        appetizer["type"] = snapshot.val().type;
        appetizer["name"] = snapshot.val().name;
        appetizer["description"] = snapshot.val().description;
        menuScreen.state.appetizers.push(appetizer);
        menuScreen.setState({appetizers: menuScreen.state.appetizers});
      }
      else if(snapshot.val().type === "beverage") {
        let beverage = {};
        beverage["id"] = snapshot.key;
        beverage["type"] = snapshot.val().type;
        beverage["name"] = snapshot.val().name;
        beverage["description"] = snapshot.val().description;
        menuScreen.state.beverages.push(beverage);
        menuScreen.setState({beverages: menuScreen.state.beverages});
      }
      else if(snapshot.val().type === "dessert") {
        let dessert = {};
        dessert["id"] = snapshot.key;
        dessert["type"] = snapshot.val().type;
        dessert["name"] = snapshot.val().name;
        dessert["description"] = snapshot.val().description;
        menuScreen.state.desserts.push(dessert);
        menuScreen.setState({desserts: menuScreen.state.desserts});
      }
      else if(snapshot.val().type === "main") {
        let main = {};
        main["id"] = snapshot.key;
        main["type"] = snapshot.val().type;
        main["name"] = snapshot.val().name;
        main["description"] = snapshot.val().description;
        menuScreen.state.mains.push(main);
        menuScreen.setState({mains: menuScreen.state.mains});
      }
      else {}
    });
    return menuObj;
  },

  addMenuItem: async (type, name, description) => {
    let success = false;
    let addMenuItemFirebase = firebase.database().ref("menu").push({type, name, description}).then(() => {
      success = true;
    }).catch((error) => {
      ToastAndroid.show("Error adding menu item: " + error, ToastAndroid.LONG);
      console.log(error);
    });
    await Promise.all([addMenuItemFirebase]);
    return success;
  },

  editMenuItem: (menuItemScreen, id, type, name, description) => {
    firebase.database().ref("menu").child(id).update({
      type: type,
      name: name,
      description: description
    }).then(() => {
      ToastAndroid.show("Successfully edited: " + name, ToastAndroid.LONG);
      menuItemScreen.props.navigation.goBack();
      return true;
    });
    ToastAndroid.show("Unable to edit menu item: " + name, ToastAndroid.LONG);
    return false;
  },

  deleteMenuItem: (menuItemDetailsScreen, id, name) => {
    firebase.database().ref("menu").child(id).remove().then(() => {
      ToastAndroid.show("Successfully deleted: " + name, ToastAndroid.LONG);
      menuItemDetailsScreen.props.navigation.goBack();
      return true;
    });
    ToastAndroid.show("Unable to delete menu item: " + name, ToastAndroid.LONG);
    return false;
  },

  loadMenuItem: (menuItemDetailsScreen, id) => {
    firebase.database().ref("menu").child(id).once("value", function(snapshot) {
      if(snapshot.val() != null) {
        menuItemDetailsScreen.setState({
          type: snapshot.val().type,
          name: snapshot.val().name,
          description: snapshot.val().description
        });
        return true;
      }
      ToastAndroid.show("Unable to load menu item", ToastAndroid.LONG);
      return false;
    });
  },

  loadTables: async () => {
    let tables = [];
    let loadTablesFirebase = firebase.database().ref("tables").once("value", function(snapshot) {
      if(snapshot.exists()) {
        let snapshotTablesObj = snapshot.val()["restaurant1"];
        let snapshotKeys = Object.keys(snapshotTablesObj);
        snapshotKeys.forEach(function(firebaseKey) {
          let table = snapshotTablesObj[firebaseKey];
          table.firebaseKey = firebaseKey;
          tables.push(table);
        });
      }
    });
    await Promise.all([loadTablesFirebase]);
    return tables;
  },

  saveTable: (table, callback) => {
    firebase.database().ref("tables").once("value", function(snapshot) {
      if(snapshot.exists()) {
        let snapshotTablesObj = snapshot.val()["restaurant1"];
        let snapshotKeys = Object.keys(snapshotTablesObj);
        if(snapshotKeys.indexOf(table.firebaseKey) !== -1) {
          // Table already exists, edit the x and y coordinates
          firebase.database().ref("tables").child("restaurant1").child(table.firebaseKey).set({
            x: table.x,
            y: table.y,
            createdAt: table.createdAt
          }).then(() => {
            callback(true);
          }).catch(function(err) {
            callback(false);
          });
        }
        else {
          // Table does not exist, but Firebase ref exists
          firebase.database().ref("tables").child("restaurant1").push(table)
            .then((snapshot) => {
              callback(true);
            })
            .catch(function(err) {
              ToastAndroid.show("Error saving table: " + err.message, ToastAndroid.LONG);
              callback(false);
            });
        }
      }
      else {
        // Firebase ref for this restaurant is missing, this is the first ever table push
        firebase.database().ref("tables").child("restaurant1").push(table)
          .then((snapshot) => {
            callback(true);
          })
          .catch(function(err) {
            ToastAndroid.show("Error saving table: " + err.message, ToastAndroid.LONG);
            callback(false);
          });
      }
    });
  },

  deleteTable: (firebaseKey, callback) => {
    firebase.database().ref("tables").child("restaurant1").child(firebaseKey).remove()
      .then(() => {
        ToastAndroid.show("Successfully deleted table.", ToastAndroid.LONG);
        callback(true);
      })
      .catch(function(err) {
        ToastAndroid.show("Error deleting table: " + err.message, ToastAndroid.LONG);
        callback(false);
      });
  }
};