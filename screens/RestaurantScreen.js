import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import firebaseFunctions from "../firebase/FirebaseFunctions";

export default class RestaurantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: null
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: "Restaurant",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("Layout")}>
        <View style={touchableOpacity("#9932CC", 40, 10, 60).view}>
          <Text style={touchableOpacity().text}>Layout</Text>
        </View>
      </TouchableOpacity>
    )
  });

  componentDidMount() {
    this.reRender = this.props.navigation.addListener("willFocus", () => {
      this.setState({tables: null});
      this.loadTables();
    });
  }

  componentWillUnmount() {
    this.reRender.remove();
  }

  render() {
    return (
      <View style={mainStyles.container}>
        {this.state.tables}
      </View>
    );
  }

  loadTables = async () => {
    let tables = await firebaseFunctions.loadTables("restaurant", this.updateTableCoordinates);
    this.setState({tables: tables});
  };
}