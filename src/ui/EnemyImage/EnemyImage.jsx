import React from "react";
import HealthBar from "../HealthBar/HealthBar";
import "./EnemyImage.css";

const EnemyImage = ({ image, name, health }) => {
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
};

export default EnemyImage;
