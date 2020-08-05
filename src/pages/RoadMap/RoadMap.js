import React from "react";
import RoadMapItem from "../../ui/RoadMapItem/RoadMapItem";
import "./RoadMap.css";

const RoadMap = () => {
  return (
    <div className="road-map">
      <RoadMapItem itemId={1} />
    </div>
  );
};

export default RoadMap;
