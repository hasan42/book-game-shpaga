import React from "react";
import { observer, inject } from "mobx-react";
import { useStores } from "@hooks/use-stores";
import HealthBar from "../HealthBar/HealthBar";
import gameStore from "@stores/gameStore";
import "./HeroImage.css";

const HeroImage = observer(({ image }) => {
  const { gameStore } = useStores();
  const bgImage = process.env.PUBLIC_URL + gameStore.playerHeroImage;

  return (
    <div className="hero">
      <HealthBar
        health={{
          current: gameStore.playerStrength,
          full: gameStore.playerStrengthMax,
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
});

export default HeroImage;
