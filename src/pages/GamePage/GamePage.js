import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import Card from "../../ui/Card/Card";

// class GamePage extends Component {
//   render() {
//     return (
//       <div className="game">
//         <h1>GamePage</h1>
//         <Card />
//       </div>
//     );
//   }
// }

const GamePage = inject("gameStore")(
  observer(({ GameStore }) => {
    return (
      <div className="game">
        <h1>GamePage</h1>
        <Card />
      </div>
    );
  })
);

export default GamePage;
