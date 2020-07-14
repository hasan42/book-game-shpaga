import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter, Link } from "react-router-dom";
import { Provider } from "mobx-react";
import gameStore from "./stores/gameStore";
import Layout from "./ui/Layout/Layout";
import IntroPage from "./pages/IntroPage/IntroPage";
import GamePage from "./pages/GamePage/GamePage";

const stores = {
  gameStore,
};

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/game/:id" component={GamePage} />
        <Route path="/" exact component={IntroPage} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <Layout>
        <div>
          <Link to="/">Home</Link> <Link to="/game/1">Game</Link>
        </div>
        {routes}
      </Layout>
    );
  }
}

export default withRouter(App);
