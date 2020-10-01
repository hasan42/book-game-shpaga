import React from "react";
import { useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { useStores } from "@hooks/use-stores";
import gameStore from "@stores/gameStore";
import "./HomePage.css";
import Button from "@ui/Button/Button";

const HomePage = observer(() => {
  const { gameStore } = useStores();
  const history = useHistory();

  return (
    <>
      <div className="home-page">
        <Button
          image="new"
          onClick={() => {
            gameStore.removeSavedGames();
            history.push(`/character`);
          }}
        >
          Начать новую игру
        </Button>
        {gameStore.canLoadSaveGame && (
          <Button
            onClick={() => {
              gameStore.loadGame();
              history.push(`/game/${gameStore.currentStep}`);
            }}
          >
            Загрузить игру
          </Button>
        )}
      </div>
    </>
  );
});

export default HomePage;
