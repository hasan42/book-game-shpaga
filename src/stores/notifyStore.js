import { observable, autorun, action, decorate } from "mobx";

class NotifyStore {
  @observable message = "";
  @observable isVisible = false;

  @action toggle() {
    this.isVisible = !this.isVisible;
  }
  @action show() {
    this.isVisible = true;
  }
  @action hide() {
    this.isVisible = false;
  }
}

const notifyStore = new NotifyStore();

autorun(() => {});

export default notifyStore;
export { NotifyStore };
