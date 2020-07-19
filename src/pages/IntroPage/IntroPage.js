import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import "./IntroPage.css";

const IntroPage = inject("gameStore")(
  observer(({ GameStore }) => {
    const history = useHistory();

    return (
      <div>
        <div
          className="intro-text"
          dangerouslySetInnerHTML={{ __html: gameStore.introText }}
        ></div>

        <ul>
          <li>
            <button
              onClick={() => {
                gameStore.removeSavedGames();
                history.push(`/game/1`);
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
    );
  })
);

export default IntroPage;
