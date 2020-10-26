import React from "react";
import { useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import gameStore from "@stores/gameStore";
import "./IntroPage.css";
import Button from "@ui/Button/Button";

const IntroPage = inject("gameStore")(
  observer(({ GameStore }) => {
    const history = useHistory();

    return (
      <div>
        <div
          className="intro-text"
          dangerouslySetInnerHTML={{ __html: gameStore.introText }}
        ></div>

        <Button
          onClick={() => {
            history.push(`/game/492`);
          }}
        >
          Начать путешествие
        </Button>
      </div>
    );
  })
);

export default IntroPage;
