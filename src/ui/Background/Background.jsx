import React from "react";
import "./Background.css";

const Background = (children, image) => {
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
};

export default Background;
