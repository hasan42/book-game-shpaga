import React from "react";
import { AdminStore } from "../stores/adminStore";
import { GameStore } from "../stores/gameStore";
import { NotifyStore } from "../stores/notifyStore";

// class RootStore {
//   constructor() {
//     this.adminStore = new AdminStore(this);
//     this.gameStore = new GameStore(this);
//     this.notifyStore = new NotifyStore(this);
//   }
// }

// const rootStore = new RootStore();

// export default rootStore;
// export { RootStore };

export const storesContext = React.createContext({
  adminStore: new AdminStore(),
  gameStore: new GameStore(),
  notifyStore: new NotifyStore(),
});
