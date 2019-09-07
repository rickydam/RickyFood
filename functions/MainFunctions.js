import {ToastAndroid} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

module.exports = {
  getItemUserData: async (callback) => {
    let userData = {userId: null, userType: null};
    try {
      let userId = await AsyncStorage.getItem("user_id");
      let userType = await AsyncStorage.getItem("user_type");
      if(userId != null || userType != null) {
        userData.userId = userId;
        userData.userType = userType;
        callback(userData);
      }
    } catch (e) {
      callback(null);
      ToastAndroid.show("Unable to get user data from AsyncStorage.", ToastAndroid.LONG);
    }
  },

  removeItemUserData: async (callback) => {
    try {
      await AsyncStorage.removeItem("user_id");
      await AsyncStorage.removeItem("user_type");
      callback(null);
    } catch (e) {
      callback(e);
      ToastAndroid.show("Unable to remove user data from AsyncStorage.", ToastAndroid.LONG);
    }
  },

  getItemSelectedRestaurant: async (callback) => {
    try {
      let selectedRestaurantString = await AsyncStorage.getItem("selected_restaurant");
      let selectedRestaurantObj = JSON.parse(selectedRestaurantString);
      callback(selectedRestaurantObj);
    } catch(e) {
      ToastAndroid.show("Unable to get selected restaurant from AsyncStorage.");
      callback(null);
    }
  }
};