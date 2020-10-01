import React from "react";
import { Link, useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import "./Death.css";

const Death = inject("gameStore")(
  observer(({ GameStore }) => {
    const history = useHistory();

    return (
      <div className="backdrop">
        <div className="death">
          <h2>Вы погибли</h2>
          <ul>
            <li>
              <Link to={"/"}>В главное меню</Link>
            </li>
            {gameStore.canLoadSaveGame && (
              <li>
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
          </ul>
        </div>
      </div>
    );
  })
);

export default Death;
