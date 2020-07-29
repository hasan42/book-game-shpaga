import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import "./CreateCharacter.css";
import Special from "../../ui/Special/Special";

const CreateCharacter = inject("gameStore")(
  observer(({ GameStore }) => {
    const [disabledButton, setDisabledButton] = useState(true);
    const history = useHistory();
    const onSelectSpecHandle = () => {
      setDisabledButton(false);
    };

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
            <button onClick={() => gameStore.calculatePlayerStat()}>
              Попробовать еще раз
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              history.push(`/intro`);
            }}
            disabled={disabledButton}
          >
            Продолжить
          </button>
        </div>
      </>
    );
  })
);

export default CreateCharacter;
