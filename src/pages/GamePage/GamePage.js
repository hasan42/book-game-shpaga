import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, Link, Redirect, useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { keysIn, valuesIn } from "lodash";
import gameStore from "@stores/gameStore";
import adminStore from "@stores/adminStore";
import notifyStore from "@stores/notifyStore";
import CharacterInfo from "@ui/CharacterInfo/CharacterInfo";
import Store from "@ui/Store/Store";
import Fight from "@ui/Fight/Fight";
import Background from "@ui/Background/Background";
import StepItem from "@ui/StepItem/StepItem";
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
            if (
              el.if === "food" &&
              gameStore.player.characteristics.food > 0 &&
              !useFood
            ) {
              gameStore.increase("strength", el.strength);
              if (el.food !== undefined) {
                gameStore.decrease("food", 1);
              }
              if (el.money !== undefined) {
                gameStore.decrease("money", el.money);
              }

              useFood = true;
            }
            if (
              el.if === "!food" &&
              gameStore.player.characteristics.food <= 0 &&
              !useFood
            ) {
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

    // const onClickStepToHandle = (to, title) => {
    //   setGameTitle(title);
    //   history.push(`/game/${to}`);
    // };

    const onClickStepToHandle = useCallback(
      (to, title) => {
        setGameTitle(title);
        history.push(`/game/${to}`);
      },
      [history]
    );
    const onClickStartHandle = useCallback(() => history.push("/"), [history]);

    const setDisabledStepByIf = (ifStep) => {
      if (ifStep === "luck") {
        return luckStep ? true : false;
      }
      if (ifStep === "!luck") {
        return !luckStep ? true : false;
      }
      if (ifStep === "swimming") {
        return gameStore.player.characteristics.special === "swimming"
          ? false
          : true;
      }
      if (ifStep === "!swimming") {
        return gameStore.player.characteristics.special === "swimming"
          ? true
          : false;
      }
      return false;
    };

    return text ? (
      <div>
        <div>
          <button onClick={() => gameStore.saveGame()}>Сохранить игру</button>
        </div>
        <div className="admin-panel">
          {adminStore.isAdmin && (
            <>
              <div>{gameStore.playerPistol}</div>
              <div>
                {gameStore.player.characteristics.strength}/
                {gameStore.player.characteristics.strengthMax}{" "}
                {gameStore.player.characteristics.ailityMax}{" "}
                {gameStore.fightRound}
              </div>
              <div>
                <button onClick={() => gameStore.decrease("strength", 2)}>
                  deth
                </button>
              </div>
              <div>
                <button
                  onClick={() =>
                    notifyStore.addArrMsgItem("showTextshowTextshowText")
                  }
                >
                  showText
                </button>
              </div>
              <div>maxCountStep - {gameStore.maxCountStep}</div>
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
                    <StepItem
                      key={step.to}
                      disabled={setDisabledStepByIf(step.if)}
                      onClick={() => onClickStepToHandle(step.to, step.text)}
                    >
                      {step.text}
                    </StepItem>
                  );
                } else if (step.type === "gameOver") {
                  return (
                    <>
                      <StepItem
                        key={`gameOver${idx}`}
                        onClick={() => onClickStartHandle()}
                      >
                        {step.text}
                      </StepItem>
                      {gameStore.canLoadSaveGame && (
                        <StepItem
                          key={`gameOverLoad${idx}`}
                          onClick={() => {
                            gameStore.loadGame();
                            history.push(`/game/${gameStore.currentStep}`);
                          }}
                        >
                          Загрузить игру
                        </StepItem>
                      )}
                    </>
                  );
                } else {
                  return (
                    <StepItem
                      key={step.to}
                      onClick={() => onClickStepToHandle(step.to, step.text)}
                    >
                      {step.text}
                    </StepItem>
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
