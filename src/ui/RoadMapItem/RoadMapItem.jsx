import React from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import RoadMapList from "../RoadMapList/RoadMapList";

const RoadMapItem = ({ itemId }) => {
  const item = gameStore.getStepById(itemId);

  return (
    <div className="road-map-item">
      <div>{item.id}</div>
      {/* <div>{item.text}</div> */}
      <RoadMapList items={item.step} />
    </div>
  );
};

export default RoadMapItem;
