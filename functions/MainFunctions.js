import {ToastAndroid} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

module.exports = {
  getItemUserType: async (callback) => {
    try {
      const value = await AsyncStorage.getItem("user_type");
      if (value != null) callback(value);
    } catch (e) {
      callback(null);
      ToastAndroid.show("Unable to get user type from AsyncStorage.", ToastAndroid.LONG);
    }
  },

  removeItemUserType: async (callback) => {
    try {
      await AsyncStorage.removeItem("user_type");
      callback(null);
    } catch (e) {
      callback(e);
      ToastAndroid.show("Unable to remove user type from AsyncStorage.", ToastAndroid.LONG);
    }
  }
};