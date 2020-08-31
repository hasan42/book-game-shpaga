import React from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import "./HealthBar.css";

const HealthBar = inject("gameStore")(
  observer(({ GameStore, health }) => {
    const healthWidth = (health.current * 100) / health.full;
    return (
      <div className="health">
        <div className="health__bar" style={{ width: `${healthWidth}%` }}></div>
        <div className="health__count">
          {health.current} / {health.full}
        </div>
      </div>
    );
  })
);

export default HealthBar;
