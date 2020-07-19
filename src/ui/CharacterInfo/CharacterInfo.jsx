import React from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import "./CharacterInfo.css";

const CharacterInfo = inject("gameStore")(
  observer(({ GameStore }) => {
    return (
      <div className="player-stat">
        <ul>
          <li>Ловкость: {gameStore.playerAgility}</li>
          <li>Сила: {gameStore.playerStrength}</li>
          <li>Честь: {gameStore.playerHonor}</li>
          <li>Деньги: {gameStore.playerMoney}</li>
          <li>Еда: {gameStore.playerFood}</li>
        </ul>
      </div>
    );
  })
);

export default CharacterInfo;
