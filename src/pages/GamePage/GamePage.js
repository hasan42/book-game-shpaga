import React from "react";
import { useParams, Link, Redirect, useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import CharacterInfo from "../../ui/CharacterInfo/CharacterInfo";
import Store from "../../ui/Store/Store";
import Fight from "../../ui/Fight/Fight";

const GamePage = inject("gameStore")(
  observer(({ GameStore }) => {
    const { id } = useParams();
    gameStore.setCurrentStep(id);
    const text = gameStore.currentStepText;

    const history = useHistory();

    return text ? (
      <div>
        <div>
          <button onClick={() => gameStore.saveGame()}>Сохранить игру</button>
        </div>
        <CharacterInfo />
        <div className="game">
          <h1>GamePage {text.id}</h1>
          <div dangerouslySetInnerHTML={{ __html: text.text }}></div>

          {text.store && <Store store={text.store} />}

          {text.fight && <Fight fight={text.fight} />}

          <ul>
            {text.step.map((step, idx) =>
              step.type === "gameOver" ? (
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
              ) : (
                <li key={step.to}>
                  <Link to={"/game/" + step.to}>{step.text}</Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <button onClick={() => gameStore.decrease("strength", 2)}>
            - str
          </button>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  })
);

export default GamePage;
