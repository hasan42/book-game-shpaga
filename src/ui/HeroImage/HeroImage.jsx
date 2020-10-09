import React from "react";
import { observer, inject } from "mobx-react";
import HealthBar from "../HealthBar/HealthBar";
import gameStore from "@stores/gameStore";
import "./HeroImage.css";

const HeroImage = inject("gameStore")(
  observer(({ GameStore, image }) => {
    const bgImage = process.env.PUBLIC_URL + gameStore.playerHeroImage;

    return (
      <div className="hero">
        <HealthBar
          health={{
            current: gameStore.player.characteristics.strength,
            full: gameStore.player.characteristics.strengthMax,
          }}
        />
        <div
          className="hero__image"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <img src={bgImage} alt="Герой" />
        </div>
      </div>
    );
  })
);

export default HeroImage;
