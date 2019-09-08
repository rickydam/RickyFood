import React from "react";
import {ToastAndroid} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "firebase";
import {API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, MESSAGING_SENDER_ID, APP_ID} from "react-native-dotenv";
import mainFunctions from "./MainFunctions";

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

module.exports = {
  loadMenuItems: (menuScreen, selectedRestaurantKey) => {
    firebase.database().ref("menus").child(selectedRestaurantKey).on("child_added", function(snapshot) {
      if(snapshot.val().type === "appetizer") {
        let appetizer = {};
        appetizer["key"] = snapshot.key;
        appetizer["type"] = snapshot.val().type;
        appetizer["name"] = snapshot.val().name;
        appetizer["description"] = snapshot.val().description;
        menuScreen.state.appetizers.push(appetizer);
        menuScreen.setState({appetizers: menuScreen.state.appetizers});
      }
      else if(snapshot.val().type === "beverage") {
        let beverage = {};
        beverage["key"] = snapshot.key;
        beverage["type"] = snapshot.val().type;
        beverage["name"] = snapshot.val().name;
        beverage["description"] = snapshot.val().description;
        menuScreen.state.beverages.push(beverage);
        menuScreen.setState({beverages: menuScreen.state.beverages});
      }
      else if(snapshot.val().type === "dessert") {
        let dessert = {};
        dessert["key"] = snapshot.key;
        dessert["type"] = snapshot.val().type;
        dessert["name"] = snapshot.val().name;
        dessert["description"] = snapshot.val().description;
        menuScreen.state.desserts.push(dessert);
        menuScreen.setState({desserts: menuScreen.state.desserts});
      }
      else if(snapshot.val().type === "main") {
        let main = {};
        main["key"] = snapshot.key;
        main["type"] = snapshot.val().type;
        main["name"] = snapshot.val().name;
        main["description"] = snapshot.val().description;
        menuScreen.state.mains.push(main);
        menuScreen.setState({mains: menuScreen.state.mains});
      }
      else {}
    });
  },

  loadMenuItemsOnce: async (menuScreen, selectedRestaurantKey, callback) => {
    let loadMenuItemsOnceFirebase = firebase.database().ref("menus").child(selectedRestaurantKey).once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.val().type === "appetizer") {
          let appetizer = {};
          appetizer.key = childSnapshot.key;
          appetizer.type = childSnapshot.val().type;
          appetizer.name = childSnapshot.val().name;
          appetizer.description = childSnapshot.val().description;
          menuScreen.state.appetizers.push(appetizer);
          menuScreen.setState({appetizers: menuScreen.state.appetizers});
        }
        else if(childSnapshot.val().type === "beverage") {
          let beverage = {};
          beverage["key"] = childSnapshot.key;
          beverage["type"] = childSnapshot.val().type;
          beverage["name"] = childSnapshot.val().name;
          beverage["description"] = childSnapshot.val().description;
          menuScreen.state.beverages.push(beverage);
          menuScreen.setState({beverages: menuScreen.state.beverages});
        }
        else if(childSnapshot.val().type === "dessert") {
          let dessert = {};
          dessert["key"] = childSnapshot.key;
          dessert["type"] = childSnapshot.val().type;
          dessert["name"] = childSnapshot.val().name;
          dessert["description"] = childSnapshot.val().description;
          menuScreen.state.desserts.push(dessert);
          menuScreen.setState({desserts: menuScreen.state.desserts});
        }
        else if(childSnapshot.val().type === "main") {
          let main = {};
          main["key"] = childSnapshot.key;
          main["type"] = childSnapshot.val().type;
          main["name"] = childSnapshot.val().name;
          main["description"] = childSnapshot.val().description;
          menuScreen.state.mains.push(main);
          menuScreen.setState({mains: menuScreen.state.mains});
        }
        else {}
      });
    });
    await Promise.all([loadMenuItemsOnceFirebase]);
    callback();
  },

  menuItemDeletedListener: (menuScreen, selectedRestaurantKey) => {
    firebase.database().ref("menus").child(selectedRestaurantKey).on("child_removed", function(snapshot) {
      let appetizers = menuScreen.state.appetizers;
      appetizers.forEach(function(appetizer, index) {
        if(appetizer.key === snapshot.key) {
          appetizers.splice(index, 1);
          menuScreen.setState({appetizers: appetizers});
        }
      });
      let beverages = menuScreen.state.beverages;
      beverages.forEach(function(beverage, index) {
        if(beverage.key === snapshot.key) {
          beverages.splice(index, 1);
          menuScreen.setState({beverages: beverages});
        }
      });
      let desserts = menuScreen.state.desserts;
      desserts.forEach(function(dessert, index) {
        if(dessert.key === snapshot.key) {
          desserts.splice(index, 1);
          menuScreen.setState({desserts: desserts});
        }
      });
      let mains = menuScreen.state.mains;
      mains.forEach(function(main, index) {
        if(main.key === snapshot.key) {
          mains.splice(index, 1);
          menuScreen.setState({mains: mains});
        }
      });
    });
  },

  menuItemChangedListener: (menuScreen, selectedRestaurantKey) => {
    firebase.database().ref("menus").child(selectedRestaurantKey).on("child_changed", function(snapshot) {
      let appetizers = menuScreen.state.appetizers;
      appetizers.forEach(function(appetizer, index) {
        if(appetizer.key === snapshot.key) {
          let updatedAppetizer = snapshot.val();
          updatedAppetizer.key = snapshot.key;
          appetizers[index] = updatedAppetizer;
          menuScreen.setState({appetizers: appetizers});
        }
      });
      let beverages = menuScreen.state.beverages;
      beverages.forEach(function(beverage, index) {
        if(beverage.key === snapshot.key) {
          let updatedBeverage = snapshot.val();
          updatedBeverage.key = snapshot.key;
          beverages[index] = updatedBeverage;
          menuScreen.setState({beverages: beverages});
        }
      });
      let desserts = menuScreen.state.desserts;
      desserts.forEach(function(dessert, index) {
        if(dessert.key === snapshot.key) {
          let updatedDessert = snapshot.val();
          updatedDessert.key = snapshot.key;
          desserts[index] = updatedDessert;
          menuScreen.setState({desserts: desserts});
        }
      });
      let mains = menuScreen.state.mains;
      mains.forEach(function(main, index) {
        if(main.key === snapshot.key) {
          let updatedMain = snapshot.val();
          updatedMain.key = snapshot.key;
          mains[index] = updatedMain;
          menuScreen.setState({mains: mains});
        }
      });
    });
  },

  addMenuItem: async (menuItemObj, selectedRestaurantKey) => {
    let success = false;
    let addMenuItemFirebase = firebase.database().ref("menus").child(selectedRestaurantKey).push(menuItemObj).then(() => {
      success = true;
    }).catch((error) => {
      ToastAndroid.show("Error adding menu item: " + error, ToastAndroid.LONG);
      console.log(error);
    });
    await Promise.all([addMenuItemFirebase]);
    return success;
  },

  editMenuItem: (menuItemScreen, key, menuItemObj) => {
    firebase.database().ref("menu").child(key).update(menuItemObj).then(() => {
      ToastAndroid.show("Successfully edited: " + menuItemObj.name, ToastAndroid.LONG);
      menuItemScreen.props.navigation.goBack();
      return true;
    });
  },

  deleteMenuItem: (menuItemDetailsScreen, restaurantKey, menuItemKey, name) => {
    firebase.database().ref("menus").child(restaurantKey).child(menuItemKey).remove().then(() => {
      ToastAndroid.show("Successfully deleted: " + name, ToastAndroid.LONG);
      menuItemDetailsScreen.props.navigation.goBack();
      return true;
    });
  },

  loadMenuItem: (menuItemDetailsScreen, restaurantKey, menuItemKey) => {
    firebase.database().ref("menus").child(restaurantKey).child(menuItemKey).once("value", function(snapshot) {
      if(snapshot.val() != null) {
        menuItemDetailsScreen.setState({
          type: snapshot.val().type,
          name: snapshot.val().name,
          description: snapshot.val().description
        });
        return true;
      }
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
  },

  register: (email, password, callback) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredentials) => {
      callback(userCredentials, null);
    }).catch(function(err) {
      callback(null, err);
    });
  },

  saveUserData: (type, uid, callback) => {
    firebase.database().ref("users").child(uid).set({
      type: type
    }).then(async function () {
      try {
        let userData = {userId: uid, userType: type};
        await AsyncStorage.setItem("user_data", JSON.stringify(userData));
        callback(null);
      } catch(e) {
        ToastAndroid.show("Unable to save user type to AsyncStorage.", ToastAndroid.LONG);
      }
    }).catch(function(err) {
      callback(err);
    });
  },

  checkUserAuthentication: (callback) => {
    firebase.auth().onAuthStateChanged(user => {
      callback(user);
    });
  },

  login: (email, password, callback) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredentials) => {
      callback(userCredentials, null);
    }).catch(err => {
      callback(null, err);
    });
  },

  getUserData: (uid, callback) => {
    firebase.database().ref("users").child(uid).once("value", async function(snapshot) {
      if(snapshot.val() != null) {
        try {
          let userData = {userId: uid, userType: snapshot.val().type};
          await AsyncStorage.setItem("user_data", JSON.stringify(userData));
          callback();
        } catch(e) {
          ToastAndroid.show("Unable to save user type to AsyncStorage.", ToastAndroid.LONG);
        }
      }
      else {
        ToastAndroid.show("Unable to get user type.", ToastAndroid.LONG);
      }
    });
  },

  logout: (callback) => {
    firebase.auth().signOut().then(() => {
      callback();
    }).catch(function(err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    });
  },

  createRestaurant: (createRestaurantScreen, restaurantName) => {
    mainFunctions.getItemUserData(function(userData) {
      if(userData !== null) {
        let restaurantObj = {name: restaurantName, owner: userData.userId};
        firebase.database().ref("restaurants").push(restaurantObj).then(() => {
          ToastAndroid.show("Successfully created restaurant.", ToastAndroid.LONG);
          createRestaurantScreen.props.navigation.goBack();
        })
      }
      else {
        ToastAndroid.show("Unable to get user data from AsyncStorage.", ToastAndroid.LONG);
      }
    });
  },

  loadRestaurants: (callback) => {
    firebase.database().ref("restaurants").once("value", function(snapshot) {
      if(snapshot.exists()) {
        callback(snapshot.val());
      }
      else {
        callback(null);
        ToastAndroid.show("Unable to load restaurants.", ToastAndroid.LONG);
      }
    });
  }
};