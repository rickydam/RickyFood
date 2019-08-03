import React from "react";
import {Animated, PanResponder, View} from "react-native";
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
      key: this.props.id
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
      }]),
      onPanResponderRelease: (event, gesture) => {
        this.props.callback({
          key: this.state.key,
          x: this.state.coordinates.x + this.state.position.x._value,
          y: this.state.coordinates.y + this.state.position.y._value
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

  render = () => {
    return (
      <View>
        {this.renderTable()}
      </View>
    );
  };

  renderTable = () => {
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[this.state.position.getLayout(), layoutStyles.table]}>
      </Animated.View>
    );
  };
}