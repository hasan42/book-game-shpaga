import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter, Link } from "react-router-dom";
import { Provider } from "mobx-react";
import gameStore from "./stores/gameStore";
import Layout from "./ui/Layout/Layout";
import IntroPage from "./pages/IntroPage/IntroPage";
import GamePage from "./pages/GamePage/GamePage";
import CreateCharacter from "./pages/CreateCharacter/CreateCharacter";
import HomePage from "./pages/HomePage/HomePage";
import RoadMap from "./pages/RoadMap/RoadMap";

const stores = {
  gameStore,
};

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/road-map" component={RoadMap} />
        <Route path="/game/:id" component={GamePage} />
        <Route path="/character" component={CreateCharacter} />
        <Route path="/intro" component={IntroPage} />
        <Route path="/" exact component={HomePage} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <Layout>
        <div>
          <Link to="/">Home</Link> <Link to="/character">Character</Link>{" "}
          <Link to="/game/1">Game</Link> <Link to="/road-map">RoadMap</Link>
        </div>
        {routes}
      </Layout>
    );
  }
}

export default withRouter(App);
