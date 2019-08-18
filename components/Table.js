import React from "react";
import {Alert, Animated, PanResponder, Text, TouchableOpacity, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import tableStyles from "../styles/TableStyles";

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: new Animated.ValueXY({
        x: this.props.table.x,
        y: this.props.table.y
      }),
      coordinates: {
        x: this.props.table.x,
        y: this.props.table.y
      }
    };

    if(this.props.screen === "LayoutScreen") {
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (event, gesture) => {
          this.state.position.setOffset(this.state.position.__getValue());
          this.state.position.setValue({x: 0, y: 0})
        },
        onPanResponderMove: Animated.event([null, {
          dx: this.state.position.x,
          dy: this.state.position.y
        }]),
        onPanResponderRelease: (event, gesture) => {
          this.props.updateTableCoordinates({
            x: this.state.coordinates.x + this.state.position.x._value,
            y: this.state.coordinates.y + this.state.position.y._value,
            createdAt: this.props.table.createdAt
          });
          this.setState({
            coordinates: {
              x: this.state.coordinates.x + this.state.position.x._value,
              y: this.state.coordinates.y + this.state.position.y._value
            }
          });
        }
      });
    }
    else {
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true
      });
    }
  }

  render = () => {
    return (
      <View>
        {this.renderTable()}
      </View>
    );
  };

  renderTable = () => {
    if(this.props.screen === "LayoutScreen") {
      return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[this.state.position.getLayout(), mainStyles.table]}>
          <TouchableOpacity
            onPress={() => this.props.deleteTable(this.props.table.firebaseKey)}
            style={tableStyles.deleteButton}>
            <View>
              <Text style={tableStyles.deleteButtonText}>X</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
    }
    else {
      return (
        <Animated.View
          style={[this.state.position.getLayout(), mainStyles.table]}>
          <TouchableOpacity
            onPress={() => Alert.alert("Table onPress", this.props.table.firebaseKey)}
            style={mainStyles.table}>
          </TouchableOpacity>
        </Animated.View>
      );
    }
  };
}