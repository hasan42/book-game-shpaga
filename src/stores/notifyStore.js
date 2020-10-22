import { observable, autorun, action } from "mobx";

class NotifyStore {
  @observable messageArray = [];
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

  @action addArrMsgItem(newMsg) {
    this.messageArray.push({
      id: this.generateId(),
      msg: newMsg,
      timer: 5000,
    });
  }
  @action removeArrMsgItem(id) {
    let findMsg = this.messageArray.findIndex((el) => el.id === id);
    this.messageArray.splice(findMsg, 1);
  }

  generateId() {
    return Math.round(Math.random() * 36 ** 12).toString(36);
  }
}

const notifyStore = new NotifyStore();

autorun(() => {});

export default notifyStore;
export { NotifyStore };
