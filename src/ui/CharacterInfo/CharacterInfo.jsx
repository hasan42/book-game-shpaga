import React from "react";
import { observer, inject } from "mobx-react";
import gameStore from "@stores/gameStore";
import "./CharacterInfo.css";
import Death from "../Death/Death";

const CharacterInfo = inject("gameStore")(
  observer(({ GameStore }) => {
    return (
      <>
        <div className="player-stat">
          <ul>
            <li>Ловкость: {gameStore.player.characteristics.agility}</li>
            <li>Сила: {gameStore.player.characteristics.strength}</li>
            <li>Честь: {gameStore.player.characteristics.honor}</li>
            <li>Деньги: {gameStore.player.characteristics.money}</li>
            <li>Еда: {gameStore.player.characteristics.food}</li>
          </ul>
        </div>

        {gameStore.player.characteristics.strength <= 0 && <Death />}
      </>
    );
  })
);

export default CharacterInfo;
