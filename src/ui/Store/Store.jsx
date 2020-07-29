import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import "./Store.css";

const Store = inject("gameStore")(
  observer(({ GameStore, store }) => {
    return (
      <div className="store">
        {store.map((storeItem, idx) => (
          <div className="store-item" key={idx}>
            <div className="store-item__name">
              {gameStore.getParamName(storeItem.item)}
            </div>
            <div className="store-item__count">
              <button
                onClick={() => {
                  gameStore.decrease(storeItem.item, 1);
                  gameStore.increase("money", storeItem.price);
                }}
                disabled={gameStore.getParamValue(storeItem.item) <= 0}
              >
                -
              </button>
              <span>{gameStore.getParamValue(storeItem.item)}</span>
              <button
                onClick={() => {
                  gameStore.increase(storeItem.item, 1);
                  gameStore.decrease("money", storeItem.price);
                }}
                disabled={gameStore.getParamValue("money") < storeItem.price}
              >
                +
              </button>
            </div>
            <div className="store-item__price">{storeItem.price}</div>
          </div>
        ))}
      </div>
    );
  })
);

export default Store;
