import React from "react";
import { observer, inject } from "mobx-react";
import gameStore from "@stores/gameStore";
import "./Background.css";

const Background = inject("gameStore")(
  observer(({ GameStore, children, image }) => {
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
  })
);

export default Background;
