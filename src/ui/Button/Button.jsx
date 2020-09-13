import React, { Component } from "react";
import "./Button.scss";
// import NewGame from ;

class Button extends Component {
  renderChildren = () => {
    const { label, children } = this.props;

    if (label) {
      return label;
    }

    if (children) {
      return children;
    }

    return null;
  };

  render() {
    const bgImage = process.env.PUBLIC_URL + "/images/ui/icon/add-button.svg";

    return (
      <div className="button">
        <button
          onClick={(event) => this.props.onClick(event)}
          disabled={this.props.disabled}
        >
          {this.props.image && (
            <span
              className="button-image"
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              <img src={bgImage} alt="" />
            </span>
          )}
          {this.renderChildren()}
        </button>
      </div>
    );
  }
}

export default Button;
