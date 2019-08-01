import React from "react";
import Table from "../components/Table";

export default class LayoutScreen extends React.Component {
  static navigationOptions = {
    title: "Layout"
  };

  render() {
    return (
      <Table />
    );
  }
}