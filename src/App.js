import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import MainNavigation from "./ui/MainNavigation/MainNavigation";
import Layout from "./ui/Layout/Layout";
import IntroPage from "./pages/IntroPage/IntroPage";
import GamePage from "./pages/GamePage/GamePage";
import CreateCharacter from "./pages/CreateCharacter/CreateCharacter";
import HomePage from "./pages/HomePage/HomePage";
import RoadMap from "./pages/RoadMap/RoadMap";

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
        <MainNavigation></MainNavigation>
        {routes}
      </Layout>
    );
  }
}

export default withRouter(App);
