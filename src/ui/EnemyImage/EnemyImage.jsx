import React from "react";
import { observer, inject } from "mobx-react";
import HealthBar from "../HealthBar/HealthBar";
import gameStore from "../../stores/gameStore";
import "./EnemyImage.css";

const EnemyImage = inject("gameStore")(
  observer(({ GameStore, image, name, health }) => {
    const bgImage = process.env.PUBLIC_URL + image;

    return (
      <div className="enemy">
        <div className="enemy__name">{name}</div>
        <HealthBar health={health} />
        <div
          className="enemy__image"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <img src={bgImage} alt={name} />
        </div>
      </div>
    );
  })
);

export default EnemyImage;
