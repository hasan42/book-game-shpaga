import {
  observable,
  computed,
  autorun,
  reaction,
  get,
  action,
  decorate,
} from "mobx";
import axios from "axios";

class GameStore {
  // @observable
  show;
  introText = "";

  constructor() {
    this.show = false;
  }

  // @computed
  get showIntroText() {
    return this.introText;
  }
  get isShowIntro() {
    return this.show;
  }

  // @action('toggle intro')
  toggleIntro() {
    this.show = !this.show;
  }

  // @action('show intro')
  openIntro() {
    console.log(this);
    this.show = true;
  }

  // @action('hide intro')
  closeIntro() {
    this.show = false;
  }
}
decorate(GameStore, {
  show: observable,
  introText: observable,
  isShowIntro: computed,
  toggleIntro: action,
  openIntro: action,
  closeIntro: action,
});

const gameStore = new GameStore();

autorun(() => {
  axios
    .get(process.env.PUBLIC_URL + "shpaga.json", {
      dataType: "jsonp",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    // .then((response) => {
    //   console.log(response.data);
    //   return JSON.parse(response);
    // })
    .then((response) => {
      if (response.data.intro) {
        gameStore.introText = response.data.intro;
        console.log(gameStore.introText);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  setTimeout(() => {
    gameStore.openIntro();
    gameStore.introText = "response.data.intro";
  }, 3000);
});

export default gameStore;
export { GameStore };
