import React, { Component } from "react";
import MobileMenu from "./MobileMenu";
import Menu1 from "./Menu1";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Menu1 />
        <MobileMenu />
      </div>
    );
  }
}

export default Menu;
