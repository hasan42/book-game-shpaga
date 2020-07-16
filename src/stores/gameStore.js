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
  show;
  introText = "";

  specialList = [
    "secretSword",
    "swordAndDagger",
    "doublePistol",
    "leftHand",
    "swimming",
  ]; // список возможных специальных сил
  ifHonorGoesZero = 150; // если честь упала до нуля

  playerAgilityMax = 0; // максимальная ловкость
  playerStrengthMax = 0; // максимальная сила
  playerAgility = 0; // текущая ловкость
  playerStrength = 0; // текущая сила
  playerSpecial = null; // особая сила
  playerHonor = 0; // количество чести
  playerGod = true; // обратиться к богу. Максимум 1 раз
  playerMoney = 0; // количество денег
  playerFood = 0; // количество еды. Максимально 2
  playerInventoryMax = 5; // максимальное количество предметов в инвентаре
  playerInventory = []; // инвентарь игрока
  playerHorse = 1; // лошадь игрока
  playerSword = 1; // меч игрока
  playerDagger = 0; // кинжавл игрока
  playerPistol = 1; // пистолет игрока
  playerAmmo = 1; // патроны игрока

  constructor() {
    this.show = false;
  }

  get showIntroText() {
    return this.introText;
  }
  get isShowIntro() {
    return this.show;
  }

  // кидать кубик
  turnDice(min = 1, max = 6) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  // расчет характеристик игрока
  calculatePlayerStat() {
    switch (this.turnDice()) {
      case 1:
        this.playerAgilityMax = 12;
        break;
      case 2:
        this.playerAgilityMax = 8;
        break;
      case 3:
        this.playerAgilityMax = 10;
        break;
      case 4:
        this.playerAgilityMax = 7;
        break;
      case 5:
        this.playerAgilityMax = 9;
        break;
      default:
        this.playerAgilityMax = 11;
        break;
    }
    switch (this.turnDice()) {
      case 1:
        this.playerStrengthMax = 22;
        break;
      case 2:
        this.playerStrengthMax = 18;
        break;
      case 3:
        this.playerStrengthMax = 14;
        break;
      case 4:
        this.playerStrengthMax = 24;
        break;
      case 5:
        this.playerStrengthMax = 16;
        break;
      default:
        this.playerStrengthMax = 20;
        break;
    }
  }

  // проверка удачи
  checkYouLuck() {
    return this.turnDice() % 2 === 0;
  }

  // расчет урона
  calculateFightHit(enemyAg) {
    const playerHit = this.turnDice() * 2 + this.playerAgility;
    const enemyHit = this.turnDice() * 2 + enemyAg;

    return playerHit === enemyHit ? 0 : playerHit > enemyHit ? 2 : -2;
  }

  toggleIntro() {
    this.show = !this.show;
  }

  openIntro() {
    console.log(this);
    this.show = true;
  }

  closeIntro() {
    this.show = false;
  }
}
decorate(GameStore, {
  show: observable,
  introText: observable,
  isShowIntro: computed,
  turnDice: action,
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
    .then((response) => {
      if (response.data.intro) {
        gameStore.introText = response.data.intro;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

export default gameStore;
export { GameStore };
