import React from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import "./Special.css";

const Special = inject("gameStore")(
  observer(({ GameStore, onSelectSpec }) => {
    return (
      <div className="special">
        {gameStore.specialList.map((specItem, idx) => (
          <div className="special-item" key={idx}>
            <input
              onClick={() => {
                gameStore.setSpecial(specItem.value);
                onSelectSpec();
              }}
              type="radio"
              value={specItem.value}
              name="specialList"
              id={`specialList-${idx}`}
            />
            <label htmlFor={`specialList-${idx}`}>
              <div className="special-item__name">
                <strong>{specItem.name}</strong>
              </div>
              <div className="special-item__collapse">
                <input
                  className="special-item__collapse__opener"
                  name="text-more"
                  type="checkbox"
                  id={`specialList-collapse-${idx}`}
                />
                <label htmlFor={`specialList-collapse-${idx}`}>Подробнее</label>
                <div
                  className="special-item__text"
                  dangerouslySetInnerHTML={{ __html: specItem.text }}
                ></div>
              </div>
            </label>
          </div>
        ))}
      </div>
    );
  })
);

export default Special;
