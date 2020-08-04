import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, Redirect, useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { keysIn, valuesIn } from "lodash";
import gameStore from "../../stores/gameStore";
import CharacterInfo from "../../ui/CharacterInfo/CharacterInfo";
import Store from "../../ui/Store/Store";
import Fight from "../../ui/Fight/Fight";
import "./GamePage.css";

const GamePage = inject("gameStore")(
  observer(({ GameStore }) => {
    const { id } = useParams();
    gameStore.setCurrentStep(id);
    const text = gameStore.currentStepText;

    const history = useHistory();

    const [disabledSteps, setDisabledSteps] = useState(false);
    const [luckStep, setLuckStep] = useState(null);

    useEffect(() => {
      if (text && text.effect) {
        text.effect.forEach((el) => {
          const key = keysIn(el),
            value = valuesIn(el);
          gameStore.increase(key[0], value[0]);
        });
      }
    }, [text]);

    useMemo(() => {
      if (text) {
        if (text.fight) {
          setDisabledSteps(true);
        }
        if (text.step.find((step) => step.if)) {
          if (text.step.find((step) => step.if === "luck")) {
            const newSetLuck = gameStore.checkYouLuck();
            setLuckStep(newSetLuck);
          }
        }
      }
    }, [text]);

    const onFightEndHandle = () => {
      setDisabledSteps(false);
    };

    return text ? (
      <div>
        <div>
          <button onClick={() => gameStore.saveGame()}>Сохранить игру</button>
        </div>
        <CharacterInfo />
        <div className="game">
          <h1>GamePage {text.id}</h1>
          <div>
            <button onClick={() => gameStore.decrease("strength", 2)}>
              deth
            </button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: text.text }}></div>

          {text.store && <Store store={text.store} />}

          {text.fight && (
            <Fight onFightEnd={onFightEndHandle} fight={text.fight} />
          )}

          <ul
            className={
              disabledSteps ? "game-steps_inactive" : "game-steps_active"
            }
          >
            {text.step.map((step, idx) => {
              if (step.if) {
                if (step.if === "luck") {
                  return (
                    <li
                      className={
                        luckStep ? "game-steps_inactive" : "game-steps_active"
                      }
                      key={step.to}
                    >
                      <Link to={"/game/" + step.to}>{step.text}</Link>
                    </li>
                  );
                }
                if (step.if === "!luck") {
                  return (
                    <li
                      className={
                        !luckStep ? "game-steps_inactive" : "game-steps_active"
                      }
                      key={step.to}
                    >
                      <Link to={"/game/" + step.to}>{step.text}</Link>
                    </li>
                  );
                }
              } else if (step.type === "gameOver") {
                return (
                  <>
                    <li key={`gameOver${idx}`}>
                      <Link to={"/"}>{step.text}</Link>
                    </li>
                    {gameStore.canLoadSaveGame && (
                      <li key={`gameOverLoad${idx}`}>
                        <button
                          onClick={() => {
                            gameStore.loadGame();
                            history.push(`/game/${gameStore.currentStep}`);
                          }}
                        >
                          Загрузить игру
                        </button>
                      </li>
                    )}
                  </>
                );
              } else {
                return (
                  <li key={step.to}>
                    <Link to={"/game/" + step.to}>{step.text}</Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  })
);

export default GamePage;
