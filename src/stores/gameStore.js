import {observable, computed, autorun, reaction, get, action, decorate} from 'mobx';

class GameStore {
  // @observable 
  show;

  constructor() {
    this.show = false;
  }

  // @computed 
  get isShowIntro() {
    return this.show;
  }

  // @action('toggle intro')
  toggleIntro() {
    this.show = !this.show;
  }

  // @action('show intro')
  openIntro() {
    this.show = true;
  }

  // @action('hide intro')
  closeIntro() {
    this.show = false;
  }
}
decorate(GameStore, {
    show: observable,
    isShowIntro: computed,
    toggleIntro: action,
    openIntro: action,
    closeIntro: action,
})

const gameStore = new GameStore();

autorun(() => {
  console.log(gameStore.show);
});

export default gameStore;
export { GameStore };