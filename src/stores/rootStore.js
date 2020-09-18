import { AdminStore } from "./adminStore";
import { GameStore } from "./gameStore";
import { NotifyStore } from "./notifyStore";

class RootStore {
  constructor() {
    this.adminStore = new AdminStore(this);
    this.gameStore = new GameStore(this);
    this.notifyStore = new NotifyStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
export { RootStore };
