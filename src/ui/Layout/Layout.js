import React, { Component } from "react";
import "./Layout.css";
import Notify from "../Notify/Notify";

class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        {this.props.children}
        <Notify />
      </div>
    );
  }
}

export default Layout;
