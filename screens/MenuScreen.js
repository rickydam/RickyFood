import React from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";
import firebase from "firebase";
import mainStyles from "../styles/MainStyles";
import menuStyles from "../styles/MenuStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appetizers: [],
      appetizersNames: [],
      beverages: [],
      beveragesNames: [],
      desserts: [],
      dessertsNames: [],
      mains: [],
      mainsNames: [],
      isDoneFetchingMenu: false
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: "Menu Items",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("AddMenuItem")}>
        <View style={touchableOpacity("#2196F3", 40, 10, 60).view}>
          <Text style={touchableOpacity().text}>Add</Text>
        </View>
      </TouchableOpacity>
    )
  });

   async componentDidMount() {
     let menuScreen = this;

     let loadAppetizers = firebase.database().ref("appetizers/").once("value", function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
         menuScreen.state.appetizersNames.push(childSnapshot.val().name);
         let appetizer = {};
         appetizer["name"] = childSnapshot.val().name;
         appetizer["description"] = childSnapshot.val().description;
         menuScreen.state.appetizers.push(appetizer);
         console.log(childSnapshot.val().name);
       });
     });

     let loadBeverages = firebase.database().ref("beverages/").once("value", function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
         menuScreen.state.beveragesNames.push(childSnapshot.val().name);
         let beverage = {};
         beverage["name"] = childSnapshot.val().name;
         beverage["description"] = childSnapshot.val().description;
         menuScreen.state.beverages.push(beverage);
         console.log(childSnapshot.val().name);
       });
     });

     let loadDesserts = firebase.database().ref("desserts/").once("value", function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
         menuScreen.state.dessertsNames.push(childSnapshot.val().name);
         let dessert = {};
         dessert["name"] = childSnapshot.val().name;
         dessert["description"] = childSnapshot.val().description;
         menuScreen.state.desserts.push(dessert);
         console.log(childSnapshot.val().name);
       });
     });

     let loadMains = firebase.database().ref("mains/").once("value", function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
         menuScreen.state.mainsNames.push(childSnapshot.val().name);
         let main = {};
         main["name"] = childSnapshot.val().name;
         main["description"] = childSnapshot.val().description;
         menuScreen.state.mains.push(main);
         console.log(childSnapshot.val().name);
       });
     });

     await Promise.all([loadAppetizers, loadBeverages, loadDesserts, loadMains]);

     this.setState({isDoneFetchingMenu: true});
   }

  render() {
    if(this.state.isDoneFetchingMenu) {
      return (
        <View style={mainStyles.container}>
          <SectionList
            sections={[
              {title: "Appetizers", data: this.state.appetizersNames},
              {title: "Beverages", data: this.state.beveragesNames},
              {title: "Desserts", data: this.state.dessertsNames},
              {title: "Mains", data: this.state.mainsNames}
            ]}
            renderItem={({item}) => <Text style={menuStyles.renderItem}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={menuStyles.renderSectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
    else {
      return (
        <View style={mainStyles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
  }
}