import React from "react";
import { observer, inject } from "mobx-react";
import { useStores } from "@hooks/use-stores";
import gameStore from "@stores/gameStore";
import "./Background.css";

const Background = observer(({ children, image }) => {
  const { gameStore } = useStores();
  const bgImage = process.env.PUBLIC_URL + image;

  return (
    <div className="background">
      <div
        className="background__image"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="background__content">{children}</div>
    </div>
  );
});

export default Background;
