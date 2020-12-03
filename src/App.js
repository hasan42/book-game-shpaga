import React, { Component } from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useLocation,
} from "react-router-dom";
// import { useTransition, animated } from "react-spring";

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

// export default function App() {
//   const location = useLocation();
//   const transitions = useTransition(location, (location) => location.pathname, {
//     from: { opacity: 0, transform: "translate3d(100%,0,0)" },
//     enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
//     leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
//   });
//   return (
//     <Layout>
//       <MainNavigation></MainNavigation>
//       {transitions.map(({ item: location, props, key }) => (
//         <animated.div key={key} style={props}>
//           <Switch location={location}>
//             <Route path="/road-map" component={RoadMap} />
//             <Route path="/game/:id" component={GamePage} />
//             <Route path="/character" component={CreateCharacter} />
//             <Route path="/intro" component={IntroPage} />
//             <Route path="/" exact component={HomePage} />
//             <Redirect to="/" />
//           </Switch>
//         </animated.div>
//       ))}
//     </Layout>
//   );
// }
