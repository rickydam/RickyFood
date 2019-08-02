import React from "react";
import {Animated, PanResponder, Text, View} from "react-native";
import mainStyles from "../styles/MainStyles";
import layoutStyles from "../styles/LayoutStyles";

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: new Animated.ValueXY()
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gesture) => {
        this.state.position.setOffset(this.state.position.__getValue());
        this.state.position.setValue({x: 0, y: 0})
      },
      onPanResponderMove: Animated.event([null, {
        dx: this.state.position.x,
        dy: this.state.position.y
      }])
    });
  }

  render() {
    return (
      <View>
        {this.renderTable()}
      </View>
    );
  }

  renderTable() {
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[this.state.position.getLayout(), layoutStyles.table]}>
        <Text>Drag me!</Text>
      </Animated.View>
    );
  }
}