import React from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import RoadMapItem from "../RoadMapItem/RoadMapItem";

const RoadMapList = ({ items }) => {
  return (
    <div className="road-map-list">
      {items.map((item, idx) => {
        if (item.to && typeof item.to === "number") {
          return <RoadMapItem itemId={item.to} key={idx} />;
        }
        return null;
      })}
    </div>
  );
};

export default RoadMapList;
