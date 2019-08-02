import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import layoutStyles from "../styles/LayoutStyles";
import touchableOpacity from "../styles/components/TouchableOpacity";
import Table from "../components/Table";

export default class LayoutScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Layout",
    headerRight: (
      <View style={layoutStyles.header}>
        <TouchableOpacity onPress={() => addTable()}>
          <View style={touchableOpacity("#9932CC", 40, 5, 60).view}>
            <Text style={touchableOpacity().text}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => saveLayout()}>
          <View style={touchableOpacity("#9932CC", 40, 5, 60).view}>
            <Text style={touchableOpacity().text}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  });

  render() {
    return (
      <View style={mainStyles.container}>
        <Table />
      </View>
    );
  }
}

function addTable() {}

function saveLayout() {}