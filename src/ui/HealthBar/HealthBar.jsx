import React from "react";
import "./HealthBar.css";

const HealthBar = (health) => {
  const healthWidth = (health.current * 100) / health.full;
  return (
    <div className="health">
      <div className="health__bar" style={{ width: `${healthWidth}%` }}></div>
      <div className="health__count">
        {health.current} / {health.full}
      </div>
    </div>
  );
};

export default HealthBar;
