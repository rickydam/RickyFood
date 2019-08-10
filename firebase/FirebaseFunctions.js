import React from "react";
import firebase from "firebase";
import {ToastAndroid} from "react-native";
import Table from "../components/Table";

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
    let tables = null;
    let loadTablesFirebase = firebase.database().ref("tables").once("value", function(snapshot) {
      tables = snapshot.val()["restaurant1"];
    });
    await Promise.all([loadTablesFirebase]);
    return tables;
  }
};