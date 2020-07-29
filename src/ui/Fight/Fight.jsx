import React from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import "./Fight.css";

const CharacterInfo = inject("gameStore")(
  observer(({ GameStore, fight }) => {
    let enemyFight = fight.enemy;

    return (
      <div className="fight">
        {enemyFight.map((enemyC, idx) => {
          return (
            <div className="fight-item" key={idx}>
              <div className="fight-item__name">
                {enemyC.name} - Лв: {enemyC.agility} - Сл: {enemyC.strength}
              </div>
              <div className="store-item__count">
                <button
                  onClick={() => {
                    let attackDmg = gameStore.attack(enemyC);
                    enemyFight[idx].strength =
                      enemyFight[idx].strength - attackDmg;
                    console.log(attackDmg);
                  }}
                >
                  Аттаковать
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  })
);

export default CharacterInfo;
