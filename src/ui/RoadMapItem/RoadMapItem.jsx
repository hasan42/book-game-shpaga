import React from "react";
import { observer, inject } from "mobx-react";
import { useStores } from "@hooks/use-stores";
// import gameStore from "@stores/gameStore";
import RoadMapList from "../RoadMapList/RoadMapList";

const RoadMapItem = observer(({ itemId }) => {
  const { gameStore } = useStores();
  const item = gameStore.getStepById(itemId);

  return gameStore.checkRoadMap(itemId) ? (
    <div className="road-map-item">
      <div className="road-map-id">{item.id}</div>
      {/* <div>{item.text}</div> */}
      <RoadMapList items={item.step} />
    </div>
  ) : (
    <div className="road-map-item">
      <div className="road-map-id road-map-id_link">{item.id}</div>
    </div>
  );
});

export default RoadMapItem;
