import React from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import "./Fight.css";

import HeroImage from "../HeroImage/HeroImage";
import EnemyImage from "../EnemyImage/EnemyImage";

const Fight = inject("gameStore")(
  observer(({ GameStore, fight, onFightEnd }) => {
    let enemyFight = fight.enemy;
    enemyFight.forEach((el) => {
      if (!el.maxStrength) el.maxStrength = el.strength;
    });

    return (
      <div className="fight">
        <div className="fight__hero">
          <HeroImage />
        </div>
        <div className="fight__enemy">
          {enemyFight.map((enemyC, idx) => {
            return (
              <div className="fight-item" key={idx}>
                <EnemyImage
                  image={enemyC.image}
                  name={enemyC.name}
                  health={{
                    current: enemyC.strength,
                    full: enemyC.maxStrength,
                  }}
                />
                <button
                  className="fight__button"
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
            );
          })}
        </div>
      </div>
    );
  })
);

export default Fight;
