import React from "react";
import { observer, inject } from "mobx-react";
import { useStores } from "@hooks/use-stores";
import gameStore from "@stores/gameStore";
import "./CharacterInfo.css";
import Death from "../Death/Death";

const CharacterInfo = observer(() => {
  const { gameStore } = useStores();

  return (
    <>
      <div className="player-stat">
        <ul>
          <li>Ловкость: {gameStore.playerAgility}</li>
          <li>Сила: {gameStore.playerStrength}</li>
          <li>Честь: {gameStore.playerHonor}</li>
          <li>Деньги: {gameStore.playerMoney}</li>
          <li>Еда: {gameStore.playerFood}</li>
        </ul>
      </div>

      {gameStore.playerStrength <= 0 && <Death />}
    </>
  );
});

export default CharacterInfo;
