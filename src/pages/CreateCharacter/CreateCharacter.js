import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { useStores } from "@hooks/use-stores";
import gameStore from "@stores/gameStore";
import "./CreateCharacter.css";
import Special from "@ui/Special/Special";
import Button from "@ui/Button/Button";

const CreateCharacter = observer(({ GameStore }) => {
  const { gameStore } = useStores();
  const [disabledButton, setDisabledButton] = useState(true);
  const history = useHistory();
  const onSelectSpecHandle = () => {
    setDisabledButton(false);
  };

  useEffect(() => {
    gameStore.calculatePlayerStat();
  }, []);

  return (
    <>
      <div className="create-character">
        <div className="create-character__item">
          <Special onSelectSpec={onSelectSpecHandle} />
        </div>
        <div className="create-character__item">
          <p>Расчет характеристик</p>
          <ul>
            <li>Ловкость: {gameStore.playerAgility}</li>
            <li>Сила: {gameStore.playerStrength}</li>
            <li>Спецсила: {gameStore.playerSpecial}</li>
          </ul>
          <Button onClick={() => gameStore.calculatePlayerStat()}>
            Попробовать еще раз
          </Button>
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            history.push(`/intro`);
          }}
          disabled={disabledButton}
        >
          Продолжить
        </Button>
      </div>
    </>
  );
});

export default CreateCharacter;
