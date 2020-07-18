import React, { Component } from "react";
import { useParams, Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import Card from "../../ui/Card/Card";

const GamePage = inject("gameStore")(
  observer(({ GameStore }) => {
    const { id } = useParams();
    gameStore.setCurrentStep(id);
    const text = gameStore.currentStepText;
    console.log(gameStore, text);

    return (
      <div className="game">
        <h1>GamePage</h1>
        <div dangerouslySetInnerHTML={{ __html: text.text }}></div>
        <ul>
          {text.step.map((step) => (
            <li>
              <Link to={"/game/" + step.to}>{step.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  })
);

export default GamePage;
