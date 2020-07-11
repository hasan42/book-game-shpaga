import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Layout from "./ui/Layout/Layout";
import IntroPage from "./pages/IntroPage/IntroPage";
import GamePage from "./pages/GamePage/GamePage";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/game/:id" component={GamePage} />
        <Route path="/" exact component={IntroPage} />
        <Redirect to="/" />
      </Switch>
    );

    return <Layout>{routes}</Layout>;
  }
}

export default withRouter(App);
