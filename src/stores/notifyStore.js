import { observable, autorun, action, decorate } from "mobx";

class NotifyStore {
  message = "";
  isVisible = false;

  toggle() {
    this.isVisible = !this.isVisible;
  }
  show() {
    this.isVisible = true;
  }
  hide() {
    this.isVisible = false;
  }
}
decorate(NotifyStore, {
  message: observable,
  isVisible: observable,
  toggle: action,
  show: action,
  hide: action,
});

const notifyStore = new NotifyStore();

autorun(() => {});

export default notifyStore;
export { NotifyStore };
