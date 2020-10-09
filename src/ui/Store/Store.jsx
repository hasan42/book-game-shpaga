import React, { Component, useMemo, useCallback } from "react";
import { observer, inject } from "mobx-react";
import gameStore from "@stores/gameStore";
import "./Store.css";

/* перевести на жизненные циклы */

@inject("gameStore")
@observer
class Store extends Component {
  initStore = {};

  constructor(props) {
    super(props);

    this.props.store.forEach((element) => {
      this.initStore[element.item] = gameStore.player.inventory[element.item];
    });
  }

  checkByTypeInBuy(item) {
    if (this.props.type && this.props.type === "buy") {
      return gameStore.player.inventory[item] <= this.initStore[item];
    } else {
      return false;
    }
  }
  checkByTypeInSell(item) {
    if (this.props.type && this.props.type === "sell") {
      return gameStore.player.inventory[item] >= this.initStore[item];
    } else {
      return false;
    }
  };

  render() {
    return (<div className="store">
    {this.props.store.map((storeItem, idx) => (
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
            disabled={
              this.checkByTypeInBuy(storeItem.item) ||
              gameStore.player.inventory[storeItem.item] <= 0
            }
          >
            -
          </button>
          <span>{gameStore.player.inventory[storeItem.item]}</span>
          <button
            onClick={() => {
              gameStore.increase(storeItem.item, 1);
              gameStore.decrease("money", storeItem.price);
            }}
            disabled={
              this.checkByTypeInSell(storeItem.item) ||
              gameStore.player.inventory["money"] < storeItem.price ||
              gameStore.checkInventory()
            }
          >
            +
          </button>
        </div>
        <div className="store-item__price">{storeItem.price}</div>
      </div>
    ))}
  </div>)
  }
}

export default Store;
