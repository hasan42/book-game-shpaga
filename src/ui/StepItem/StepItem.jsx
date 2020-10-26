import React from "react";
import "./StepItem.scss";

const StepItem = ({ disabled, onClick, children }) => {
  return (
    <div
      className={"step-item" + (disabled ? " step-item_disabled" : "")}
      onClick={onClick}
    >
      <div className="step-item__indeicator"></div>
      <div className="step-item__label">{children}</div>
    </div>
  );
};

export default StepItem;
