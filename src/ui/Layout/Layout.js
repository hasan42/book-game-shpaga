import React, { Component } from "react";
import "./Layout.css";
import NotifyList from "@ui/NotifyList/NotifyList";

class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        {this.props.children}
        <NotifyList />
      </div>
    );
  }
}

export default Layout;
