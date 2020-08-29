import React from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import "./Fight.css";

const Fight = inject("gameStore")(
  observer(({ GameStore, fight, onFightEnd }) => {
    let enemyFight = fight.enemy;

    return (
      <div className="fight">
        {enemyFight.map((enemyC, idx) => {
          return (
            <div className="fight-item" key={idx}>
              <div className="fight-item__name">
                {enemyC.name} - Лв: {enemyC.agility} - Сл: {enemyC.strength}
              </div>
              <div className="fight-item__image">
                <img
                  src={process.env.PUBLIC_URL + enemyC.image}
                  alt={enemyC.name}
                />
              </div>
              <div className="store-item__count">
                <button
                  disabled={enemyC.strength <= 0}
                  onClick={() => {
                    let attackDmg = gameStore.attack(enemyFight, idx);
                    enemyFight[idx].strength =
                      enemyFight[idx].strength - attackDmg;

                    if (
                      enemyFight.filter((en) => en.strength <= 0).length ===
                      enemyFight.length
                    ) {
                      onFightEnd();
                    }
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

export default Fight;
