import React from "react";
import { observer, inject } from "mobx-react";
import adminStore from "../../stores/adminStore";
import { Link } from "react-router-dom";
import "./MainNavigation.css";

const MainNavigation = inject("adminStore")(
  observer(({ AdminStore }) => {
    return (
      <div className="main-navigation">
        {adminStore.isAdmin ? (
          <>
            <Link to="/">Home</Link> <Link to="/character">Character</Link>{" "}
            <Link to="/game/1">Game</Link> <Link to="/road-map">RoadMap</Link>
          </>
        ) : null}
        <button onClick={() => adminStore.toggle()}>admin</button>
      </div>
    );
  })
);

export default MainNavigation;
