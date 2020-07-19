import React, { Component } from "react";
import { useParams, Link, Redirect, useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import Card from "../../ui/Card/Card";

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
        <div className="game">
          <h1>GamePage {text.id}</h1>
          <div dangerouslySetInnerHTML={{ __html: text.text }}></div>
          <ul>
            {text.step.map((step, idx) =>
              step.type === "gameOver" ? (
                <>
                  <li key={idx}>
                    <Link to={"/"}>{step.text}</Link>
                  </li>
                  {gameStore.canLoadSaveGame && (
                    <li key={idx + 1}>
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
      </div>
    ) : (
      <Redirect to="/" />
    );
  })
);

export default GamePage;
