import React from "react";
import { useHistory } from "react-router-dom";
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

        <button
          onClick={() => {
            history.push(`/game/1`);
          }}
        >
          Начать путешествие
        </button>
      </div>
    );
  })
);

export default IntroPage;
