import notifyStore from "./notifyStore";
import { observable, autorun, action, decorate } from "mobx";

class AdminStore {
  isAdmin = false;

  toggle() {
    this.isAdmin = !this.isAdmin;
  }
  turnOn() {
    this.isAdmin = true;
  }
  turnOff() {
    this.isAdmin = false;
  }

  showText() {
    console.log(notifyStore);
    notifyStore.message = "qweqweqwe";
  }

  // constructor(NotifyStore) {
  //   this.notifyStore = NotifyStore;
  // }
}
decorate(AdminStore, {
  isAdmin: observable,
  toggle: action,
  turnOn: action,
  turnOff: action,
});

const adminStore = new AdminStore();

autorun(() => {});

export default adminStore;
export { AdminStore };
