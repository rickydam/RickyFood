import {ToastAndroid} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

module.exports = {
  getItemUserData: async (callback) => {
    try {
      let userDataString = await AsyncStorage.getItem("user_data");
      if(userDataString !== null) {
        let userDataObj = JSON.parse(userDataString);
        callback(userDataObj);
      }
      else {
        callback(null);
      }
    } catch (e) {
      callback(null);
      ToastAndroid.show("Unable to get user data from AsyncStorage.", ToastAndroid.LONG);
    }
  },

  removeItemUserData: async (callback) => {
    try {
      await AsyncStorage.removeItem("user_data");
      callback(null);
    } catch (e) {
      callback(e);
      ToastAndroid.show("Unable to remove user data from AsyncStorage.", ToastAndroid.LONG);
    }
  },

  getItemSelectedRestaurant: async (callback) => {
    try {
      let selectedRestaurantString = await AsyncStorage.getItem("selected_restaurant");
      if(selectedRestaurantString !== null) {
        let selectedRestaurantObj = JSON.parse(selectedRestaurantString);
        callback(selectedRestaurantObj);
      }
      else {
        callback(null);
      }
    } catch(e) {
      ToastAndroid.show("Unable to get selected restaurant from AsyncStorage.", ToastAndroid.LONG);
      callback(null);
    }
  },

  removeItemSelectedRestaurant: async (callback) => {
    try {
      await AsyncStorage.removeItem("selected_restaurant");
      callback(null);
    } catch(e) {
      ToastAndroid.show("Unable to remove selected restaurant from AsyncStorage." + e.message, ToastAndroid.LONG);
      callback(e);
    }
  }
};