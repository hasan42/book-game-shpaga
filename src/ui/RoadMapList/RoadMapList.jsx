import React from "react";
import RoadMapItem from "../RoadMapItem/RoadMapItem";

const RoadMapList = ({ items }) => {
  return (
    <div className="road-map-list">
      {items.map((item, idx) => {
        if (item.to && typeof item.to === "number") {
          return <RoadMapItem itemId={item.to} key={idx} />;
        } else {
          return <div className="road-map-id road-map-id_link">{item.to}</div>;
        }
      })}
    </div>
  );
};

export default RoadMapList;
