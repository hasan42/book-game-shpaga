import React from "react";
import { observer, inject } from "mobx-react";
import { useStores } from "@hooks/use-stores";
import gameStore from "@stores/gameStore";
import "./HealthBar.css";

const HealthBar = observer(({ GameStore, health }) => {
  const { gameStore } = useStores();
  const healthWidth = (health.current * 100) / health.full;

  return (
    <div className="health">
      <div className="health__bar" style={{ width: `${healthWidth}%` }}></div>
      <div className="health__count">
        {health.current} / {health.full}
      </div>
    </div>
  );
});

export default HealthBar;
