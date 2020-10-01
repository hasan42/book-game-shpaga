import React from "react";
import { useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { useStores } from "@hooks/use-stores";
import gameStore from "@stores/gameStore";
import "./IntroPage.css";
import Button from "@ui/Button/Button";

const IntroPage = observer(() => {
  const { gameStore } = useStores();
  const history = useHistory();

  return (
    <div>
      <div
        className="intro-text"
        dangerouslySetInnerHTML={{ __html: gameStore.introText }}
      ></div>

      <Button
        onClick={() => {
          history.push(`/game/1`);
        }}
      >
        Начать путешествие
      </Button>
    </div>
  );
});

export default IntroPage;
