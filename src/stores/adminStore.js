// import { notifyStore } from "./notifyStore";
import { observable, autorun, action, decorate } from "mobx";
import { useStores } from "@hooks/use-stores";

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
    console.log(this.notifyStore);
    this.notifyStore.message = "qweqweqwe";
  }

  constructor(NotifyStore) {
    const { notifyStore } = useStores();
    // this.notifyStore = notifyStore;
  }
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
