import React from "react";
import "./StepItem.scss";

const StepItem = ({ disabled, onClick, children }) => {
  return (
    <div
      className={"step-item" + (disabled ? "step-item" : "")}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default StepItem;
