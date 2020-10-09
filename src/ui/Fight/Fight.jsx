import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import gameStore from "@stores/gameStore";
import "./Fight.css";

import HeroImage from "../HeroImage/HeroImage";
import EnemyImage from "../EnemyImage/EnemyImage";

const Fight = inject("gameStore")(
  observer(({ fight, onFightEnd }) => {
    let enemyFight = fight.enemy;

    console.log("rerender Fight", enemyFight);

    enemyFight.forEach((el) => {
      if (!el.maxStrength) el.maxStrength = el.strength;
    });

    const [disabledEnemyStrength, setDisabledEnemyStrength] = useState(0);

    const fightHasWinCondition = () => {
      return fight.win && fight.win !== "kill" ? false : true;
    };

    useEffect(() => {
      if (fightHasWinCondition) {
        if (fight.win === "strength") {
          setDisabledEnemyStrength(2);
        }
      }
    }, []);

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
                  disabled={enemyC.strength <= disabledEnemyStrength}
                  onClick={() => {
                    let attackDmg = gameStore.attack(
                      enemyFight,
                      idx,
                      disabledEnemyStrength
                    );
                    enemyFight[idx].strength =
                      enemyFight[idx].strength - attackDmg;

                    if (
                      enemyFight.filter(
                        (en) => en.strength <= disabledEnemyStrength
                      ).length === enemyFight.length
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
