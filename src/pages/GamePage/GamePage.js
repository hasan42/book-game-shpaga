import React, { Component } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import Card from "../../ui/Card/Card";

const GamePage = inject("gameStore")(
  observer(({ GameStore }) => {
    const { id } = useParams();
    gameStore.setCurrentStep(id);
    const text = gameStore.currentStepText;
    console.log(gameStore, text);

    return text ? (
      <div className="game">
        <h1>GamePage {text.id}</h1>
        <div dangerouslySetInnerHTML={{ __html: text.text }}></div>
        <ul>
          {text.step.map((step) => (
            <li key={step.to}>
              <Link to={"/game/" + step.to}>{step.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <Redirect to="/" />
    );
  })
);

export default GamePage;
