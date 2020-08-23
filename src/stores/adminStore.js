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

  constructor() {}
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
