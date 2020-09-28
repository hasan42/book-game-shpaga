import { observable, autorun, action, decorate } from "mobx";

export class NotifyStore {
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
// decorate(NotifyStore, {
//   message: observable,
//   isVisible: observable,
//   toggle: action,
//   show: action,
//   hide: action,
// });

// const notifyStore = new NotifyStore();

autorun(() => {});

// export default notifyStore;
// export { NotifyStore };
