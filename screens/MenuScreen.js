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
      isDoneFetchingMenu: false,
      refreshing: false
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: "Menu Items",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("MenuItem", {purpose: "Add"})}>
        <View style={touchableOpacity("#2196F3", 40, 10, 60).view}>
          <Text style={touchableOpacity().text}>Add</Text>
        </View>
      </TouchableOpacity>
    )
  });

  componentDidMount() {
    this.reRender = this.props.navigation.addListener("willFocus", () => {
      this.loadMenuItems();
    });
  }

  componentWillUnmount() {
    this.reRender.remove();
  }

  render() {
    if(this.state.isDoneFetchingMenu) {
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
                onPress={() => this.props.navigation.navigate("MenuItemDetails", {
                  id: item["id"],
                  type: item["type"],
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
    else {
      return (
        <View style={mainStyles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.loadMenuItems().then(() => {
      this.setState({refreshing: false});
    });
  };

  loadMenuItems = async () => {
    this.clearMenuItems();
    let menuObj = await firebaseFunctions.loadMenuItems(this);
    this.setState({
      isDoneFetchingMenu: true,
      appetizers: menuObj["appetizers"],
      beverages: menuObj["beverages"],
      desserts: menuObj["desserts"],
      mains: menuObj["mains"]
    });
  };

  clearMenuItems = () => {
    this.setState({
      appetizers: [],
      beverages: [],
      desserts: [],
      mains: [],
      isDoneFetchingMenu: false
    });
  };
}