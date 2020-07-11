import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "mobx-react";
import "./index.css";
import App from "./App";
import mainStore from "./stores/mainStore";
import optionsStore from "./stores/optionsStore";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

const stores = {
    mainStore,
    optionsStore,
    ButtonStore : mainStore.ButtonStore,    
    FioStore : mainStore.FioStore,
    EmailStore : mainStore.EmailStore
};


ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
