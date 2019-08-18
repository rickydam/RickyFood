import React from "react";
import {RefreshControl, SectionList, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import menuStyles from "../styles/MenuStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../firebase/FirebaseFunctions";

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appetizers: [],
      beverages: [],
      desserts: [],
      mains: [],
      refreshing: false
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: "Menu Items",
    headerRight: (
      <View style={mainStyles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate("MenuItem", {purpose: "Add"})}>
          <View style={touchableOpacity("#2196F3", 40, 5, 60).view}>
            <Text style={touchableOpacity().text}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Order")}>
          <View style={touchableOpacity("#9932CC", 40, 5, 90).view}>
            <Text style={touchableOpacity().text}>View Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  });

  componentDidMount() {
    this.loadMenuItems();
  }

  render() {
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
              onPress={() => this.props.navigation.navigate("MenuItemDetails", {key: item["key"]})}
              underlayColor="black">
              <View>
                <Text style={menuStyles.renderItem}>{item["name"]}</Text>
              </View>
            </TouchableHighlight>
          )}
          renderSectionHeader={({section}) => <Text style={menuStyles.renderSectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </View>
    );
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.loadMenuItems().then(() => {
      this.setState({refreshing: false});
    });
  };

  loadMenuItems = () => {
    this.clearMenuItems();
    firebaseFunctions.loadMenuItems(this);
  };

  clearMenuItems = () => {
    this.setState({
      appetizers: [],
      beverages: [],
      desserts: [],
      mains: []
    });
  };
}