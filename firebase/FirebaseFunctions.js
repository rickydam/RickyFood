import React from "react";
import firebase from "firebase";
import {ToastAndroid} from "react-native";

module.exports = {
  loadMenuItems: async () => {
    let menuObj = {
      appetizers: [],
      beverages: [],
      desserts: [],
      mains: []
    };
    let loadMenu = firebase.database().ref("menu").once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.val().type === "appetizer") {
          let appetizer = {};
          appetizer["id"] = childSnapshot.key;
          appetizer["type"] = childSnapshot.val().type;
          appetizer["name"] = childSnapshot.val().name;
          appetizer["description"] = childSnapshot.val().description;
          menuObj.appetizers.push(appetizer);
        }
        else if(childSnapshot.val().type === "beverage") {
          let beverage = {};
          beverage["id"] = childSnapshot.key;
          beverage["type"] = childSnapshot.val().type;
          beverage["name"] = childSnapshot.val().name;
          beverage["description"] = childSnapshot.val().description;
          menuObj.beverages.push(beverage);
        }
        else if(childSnapshot.val().type === "dessert") {
          let dessert = {};
          dessert["id"] = childSnapshot.key;
          dessert["type"] = childSnapshot.val().type;
          dessert["name"] = childSnapshot.val().name;
          dessert["description"] = childSnapshot.val().description;
          menuObj.desserts.push(dessert);
        }
        else if(childSnapshot.val().type === "main") {
          let main = {};
          main["id"] = childSnapshot.key;
          main["type"] = childSnapshot.val().type;
          main["name"] = childSnapshot.val().name;
          main["description"] = childSnapshot.val().description;
          menuObj.mains.push(main);
        }
        else {}
      });
    });
    await Promise.all([loadMenu]);
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
        snapshotKeys.forEach(function(key) {
          let table = snapshotTablesObj[key];
          table.push(key);
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
        if(snapshotKeys.indexOf(table[2]) !== -1) {
          firebase.database().ref("tables").child("restaurant1").child(table[2]).set({
            0: table[0],
            1: table[1]
          }).then(() => {
            callback(null, true);
          }).catch(function(err) {
            callback(null, false);
          });
        }
        else {
          table.splice(2, 1);
          firebase.database().ref("tables").child("restaurant1").push(table)
            .then((snapshot) => {
              callback(null, true);
            })
            .catch(function(err) {
              ToastAndroid.show("Error saving table: " + err.message, ToastAndroid.LONG);
              callback(null, false);
            });
        }
      }
      else {
        firebase.database().ref("tables").child("restaurant1").push(table)
          .then((snapshot) => {
            callback(snapshot.key, true);
          })
          .catch(function(err) {
            ToastAndroid.show("Error saving table: " + err.message, ToastAndroid.LONG);
            callback(null, false);
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