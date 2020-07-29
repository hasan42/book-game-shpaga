import React from "react";
import { useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import "./HomePage.css";

const HomePage = inject("gameStore")(
  observer(({ GameStore }) => {
    const history = useHistory();

    return (
      <>
        <div className="home-page">
          <ul>
            <li>
              <button
                onClick={() => {
                  gameStore.removeSavedGames();
                  history.push(`/character`);
                }}
              >
                Начать новую игру
              </button>
            </li>
            {gameStore.canLoadSaveGame && (
              <li>
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
          </ul>
        </div>
      </>
    );
  })
);

export default HomePage;
