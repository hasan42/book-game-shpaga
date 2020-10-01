import notifyStore from "./notifyStore";
import { observable, autorun, action, decorate } from "mobx";

export class AdminStore {
  @observable
  isAdmin = false;

  @action
  toggle() {
    this.isAdmin = !this.isAdmin;
  }
  @action
  turnOn() {
    this.isAdmin = true;
  }
  @action
  turnOff() {
    this.isAdmin = false;
  }

  @action
  showText() {
    console.log(notifyStore);
    notifyStore.message = "qweqweqwe";
  }

  // constructor(NotifyStore) {
  //   this.notifyStore = NotifyStore;
  // }
}
// decorate(AdminStore, {
//   isAdmin: observable,
//   toggle: action,
//   turnOn: action,
//   turnOff: action,
// });

// const adminStore = new AdminStore();

autorun(() => {});

// export default adminStore;
// export { AdminStore };
