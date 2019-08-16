import React from "react";
import {Animated, PanResponder, Text, TouchableOpacity, View} from "react-native";
import layoutStyles from "../styles/LayoutStyles";

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: new Animated.ValueXY({
        x: this.props.values[0],
        y: this.props.values[1]
      }),
      coordinates: {
        x: this.props.values[0],
        y: this.props.values[1]
      },
      index: this.props.index,
      firebaseKey: this.props.values[2]
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
          this.props.callback({
            index: this.state.index,
            x: this.state.coordinates.x + this.state.position.x._value,
            y: this.state.coordinates.y + this.state.position.y._value,
            firebaseKey: this.props.values[2]
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
          style={[this.state.position.getLayout(), layoutStyles.table]}>
          <TouchableOpacity
            onPress={() => this.props.delete(this.state.firebaseKey, this.state.index)}
            style={layoutStyles.deleteButton}>
            <View>
              <Text style={layoutStyles.deleteButtonText}>X</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
    }
    else {
      return (
        <Animated.View
          style={[this.state.position.getLayout(), layoutStyles.table]}>
        </Animated.View>
      );
    }
  };
}