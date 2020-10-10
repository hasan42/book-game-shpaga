import notifyStore from "./notifyStore";
import { observable, autorun, action } from "mobx";

class AdminStore {
  @observable isAdmin = false;

  @action toggle() {
    this.isAdmin = !this.isAdmin;
  }
  @action turnOn() {
    this.isAdmin = true;
  }
  @action turnOff() {
    this.isAdmin = false;
  }

  @action showText() {
    console.log(notifyStore);
    notifyStore.message = "qweqweqwe";
  }

  // constructor(NotifyStore) {
  //   this.notifyStore = NotifyStore;
  // }
}

const adminStore = new AdminStore();

autorun(() => {});

export default adminStore;
export { AdminStore };
