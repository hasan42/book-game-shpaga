import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";

const IntroPage = inject("gameStore")(
  observer(({ GameStore }) => {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: gameStore.introText }}></div>
        <Link to="/game/1">Начать игру</Link>
      </div>
    );
  })
);

export default IntroPage;
