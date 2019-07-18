import React from "react";
import { SectionList, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import firebase from "firebase";
import mainStyles from "../styles/MainStyles";
import menuStyles from "../styles/MenuStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appetizers: [],
      beverages: [],
      desserts: [],
      mains: [],
      isDoneFetchingMenu: false
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: "Menu Items",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("MenuItem")}>
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
         let appetizer = {};
         appetizer["name"] = childSnapshot.val().name;
         appetizer["description"] = childSnapshot.val().description;
         menuScreen.state.appetizers.push(appetizer);
       });
     });

     let loadBeverages = firebase.database().ref("beverages/").once("value", function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
         let beverage = {};
         beverage["name"] = childSnapshot.val().name;
         beverage["description"] = childSnapshot.val().description;
         menuScreen.state.beverages.push(beverage);
       });
     });

     let loadDesserts = firebase.database().ref("desserts/").once("value", function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
         let dessert = {};
         dessert["name"] = childSnapshot.val().name;
         dessert["description"] = childSnapshot.val().description;
         menuScreen.state.desserts.push(dessert);
       });
     });

     let loadMains = firebase.database().ref("mains/").once("value", function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
         let main = {};
         main["name"] = childSnapshot.val().name;
         main["description"] = childSnapshot.val().description;
         menuScreen.state.mains.push(main);
       });
     });

     await Promise.all([loadAppetizers, loadBeverages, loadDesserts, loadMains]);

     this.setState({isDoneFetchingMenu: true});
   }

  render() {
    if(this.state.isDoneFetchingMenu) {
      const {navigate} = this.props.navigation;
      return (
        <View style={mainStyles.container}>
          <SectionList
            sections={[
              {title: "Appetizers", data: this.state.appetizers},
              {title: "Mains", data: this.state.mains},
              {title: "Desserts", data: this.state.desserts},
              {title: "Beverages", data: this.state.beverages}
            ]}
            renderItem={({item}) => (
              <TouchableHighlight
                onPress={() => navigate("MenuItemDetails", {
                  name: item["name"],
                  description: item["description"]
                })}
                underlayColor="black">
                <View>
                  <Text style={menuStyles.renderItem}>{item["name"]}</Text>
                </View>
              </TouchableHighlight>
            )}
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