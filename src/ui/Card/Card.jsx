import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";

const Card = inject("gameStore")(
  observer(({ GameStore }) => {
    return (
      <div>
        <div>
          <p>Game store : </p>
        </div>
      </div>
    );
  })
);

export default Card;
