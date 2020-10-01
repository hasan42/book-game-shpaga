import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, Redirect, useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { keysIn, valuesIn } from "lodash";
import gameStore from "../../stores/gameStore";
import adminStore from "../../stores/adminStore";
import CharacterInfo from "../../ui/CharacterInfo/CharacterInfo";
import Store from "../../ui/Store/Store";
import Fight from "../../ui/Fight/Fight";
import Background from "../../ui/Background/Background";
import "./GamePage.scss";

const GamePage = inject(
  "gameStore",
  "adminStore"
)(
  observer(({ GameStore, AdminStore }) => {
    const { id } = useParams();
    gameStore.setCurrentStep(id);
    const text = gameStore.currentStepText;

    const history = useHistory();

    const [disabledSteps, setDisabledSteps] = useState(false);
    const [luckStep, setLuckStep] = useState(null);
    const [gameTitle, setGameTitle] = useState("Начало путешествия");

    const onFightStart = () => {
      gameStore.fightRound = 0;
      setDisabledSteps(true);
    };

    useEffect(() => {
      if (text && text.effect) {
        let useFood = false;
        text.effect.forEach((el) => {
          if (el.if) {
            if (el.if === "food" && gameStore.playerFood > 0 && !useFood) {
              gameStore.increase("strength", el.strength);
              if (el.food !== undefined) {
                gameStore.decrease("food", 1);
              }
              if (el.money !== undefined) {
                gameStore.decrease("money", el.money);
              }

              useFood = true;
            }
            if (el.if === "!food" && gameStore.playerFood <= 0 && !useFood) {
              gameStore.decrease("strength", Math.abs(el.strength));
              useFood = true;
            }
          } else {
            const key = keysIn(el),
              value = valuesIn(el);
            gameStore.increase(key[0], value[0]);
          }
        });
      }
    }, [text]);

    useMemo(() => {
      if (text) {
        if (text.fight) {
          onFightStart();
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

    const onClickStepToHandle = (to, title) => {
      setGameTitle(title);
      history.push(`/game/${to}`);
    };

    const setDisabledStepByIf = (ifStep) => {
      if (ifStep === "luck") {
        return luckStep ? "game-steps_inactive" : "game-steps_active";
      }
      if (ifStep === "!luck") {
        return !luckStep ? "game-steps_inactive" : "game-steps_active";
      }
      if (ifStep === "swimming") {
        return gameStore.playerSpecial === "swimming"
          ? "game-steps_active"
          : "game-steps_inactive";
      }
      if (ifStep === "!swimming") {
        return gameStore.playerSpecial === "swimming"
          ? "game-steps_inactive"
          : "game-steps_active";
      }
      return "game-steps_active";
    };

    return text ? (
      <div>
        <div>
          <button onClick={() => gameStore.saveGame()}>Сохранить игру</button>
        </div>
        <div className="admin-panel">
          {adminStore.isAdmin && (
            <>
              <div>
                {gameStore.playerStrength}/{gameStore.playerStrengthMax}{" "}
                {gameStore.playerAgilityMax} {gameStore.fightRound}
              </div>
              <div>
                <button onClick={() => gameStore.decrease("strength", 2)}>
                  deth
                </button>
              </div>
              <div>
                <button onClick={() => adminStore.showText()}>showText</button>
              </div>
            </>
          )}
        </div>
        <CharacterInfo />
        <div className="game">
          <div className="game-title">
            <h1>{gameTitle}</h1>
          </div>

          <div className="game-image">
            <Background image={text.image}>
              {text.fight && (
                <Fight onFightEnd={onFightEndHandle} fight={text.fight} />
              )}
              {text.store && <Store type={text.storeType} store={text.store} />}
            </Background>
          </div>

          <div className="game-text">
            <div dangerouslySetInnerHTML={{ __html: text.text }}></div>
          </div>

          <div className="game-steps">
            <ul
              className={
                disabledSteps ? "game-steps_inactive" : "game-steps_active"
              }
            >
              {text.step.map((step, idx) => {
                if (step.if) {
                  return (
                    <li
                      key={step.to}
                      className={setDisabledStepByIf(step.if)}
                      onClick={() => onClickStepToHandle(step.to, step.text)}
                    >
                      {step.text}
                    </li>
                  );
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
                    <li
                      key={step.to}
                      onClick={() => onClickStepToHandle(step.to, step.text)}
                    >
                      {step.text}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  })
);

export default GamePage;
