import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { useStores } from "@hooks/use-stores";
import gameStore from "@stores/gameStore";

const Card = observer(() => {
  const { gameStore } = useStores();
  return (
    <div>
      <div>
        <p>Game store : </p>
      </div>
    </div>
  );
});

export default Card;
