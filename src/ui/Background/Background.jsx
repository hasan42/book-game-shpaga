import React from "react";
import "./Background.css";
import { useTransition, useSpring, animated } from "react-spring";
import { usePrevious } from "@helpers/usePrevious";

const Background = ({ children, image }) => {
  const transitionsImage = useTransition(image, null, {
    from: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0,
      height: "100%",
      transform: "translate3d(100%,0,0)",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0%,0,0)",
    },
    leave: {
      opacity: 0,
      transform: "translate3d(-50%,0,0)",
    },
    config: {
      duration: 1000,
      delay: 1000,
    },
  });

  return (
    <>
      <div className="background">
        {transitionsImage.map(({ item, key, props }) => (
          <animated.div
            key={key}
            style={Object.assign(props, {
              backgroundImage: `url(${process.env.PUBLIC_URL + item})`,
            })}
            className="background__image"
          ></animated.div>
        ))}
        <div className="background__content">{children}</div>
      </div>
    </>
  );
};

export default Background;
