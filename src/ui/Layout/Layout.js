import React, { Component } from "react";
import "./Layout.css";

class Layout extends Component {
  render() {
    return <div className="Layout">{this.props.children}</div>;
  }
}

export default Layout;
