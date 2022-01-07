import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/Include/Nav";


class DashBord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav />
      </div>
    );
  }
}

export default DashBord;
