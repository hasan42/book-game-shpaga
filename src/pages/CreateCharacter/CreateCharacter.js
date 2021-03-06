import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import gameStore from "@stores/gameStore";
import "./CreateCharacter.css";
import Special from "@ui/Special/Special";
import Button from "@ui/Button/Button";

const CreateCharacter = inject("gameStore")(
  observer(({ GameStore }) => {
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
              <li>Ловкость: {gameStore.player.characteristics.agility}</li>
              <li>Сила: {gameStore.player.characteristics.strength}</li>
              <li>Спецсила: {gameStore.player.characteristics.special}</li>
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
  })
);

export default CreateCharacter;
