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

  canLoadSaveGame = false; // есть ли сохраненные игры
  currentStep = 0; // текущий шаг
  listSteps = []; // список шагов
  historySteps = []; // история шагов

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
  playerGod = false; // обратиться к богу. Максимум 1 раз
  playerMoney = 0; // количество денег
  playerFood = 0; // количество еды. Максимально 2
  playerInventoryMax = 5; // максимальное количество предметов в инвентаре
  playerInventory = []; // инвентарь игрока
  playerHorse = 0; // лошадь игрока
  playerSword = 0; // меч игрока
  playerDagger = 0; // кинжавл игрока
  playerPistol = 0; // пистолет игрока
  playerAmmo = 0; // патроны игрока

  constructor() {
    this.show = false;
    this.createNewGame();
  }

  // возвращает можно ли загрузить игру
  get canLoadOldGame() {
    return this.canLoadSaveGame;
  }

  get showIntroText() {
    return this.introText;
  }
  get isShowIntro() {
    return this.show;
  }

  // получить информацию по текущему шагу
  get currentStepText() {
    return this.listSteps.find((step) => step.id === Number(this.currentStep));
  }

  // получение шага по ИД
  getStepById(id) {
    this.listSteps.find((step) => step.id === id);
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
        this.playerAgility = 12;
        break;
      case 2:
        this.playerAgilityMax = 8;
        this.playerAgility = 8;
        break;
      case 3:
        this.playerAgilityMax = 10;
        this.playerAgility = 10;
        break;
      case 4:
        this.playerAgilityMax = 7;
        this.playerAgility = 7;
        break;
      case 5:
        this.playerAgilityMax = 9;
        this.playerAgility = 9;
        break;
      default:
        this.playerAgilityMax = 11;
        this.playerAgility = 11;
        break;
    }

    switch (this.turnDice()) {
      case 1:
        this.playerStrengthMax = 22;
        this.playerStrength = 22;
        break;
      case 2:
        this.playerStrengthMax = 18;
        this.playerStrength = 18;
        break;
      case 3:
        this.playerStrengthMax = 14;
        this.playerStrength = 14;
        break;
      case 4:
        this.playerStrengthMax = 24;
        this.playerStrength = 24;
        break;
      case 5:
        this.playerStrengthMax = 16;
        this.playerStrength = 16;
        break;
      default:
        this.playerStrengthMax = 20;
        this.playerStrength = 20;
        break;
    }
  }

  strCapitalize(str) {
    const strCapitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return strCapitalized;
  }

  // проверка удачи четно - повезло, нечетно - не повезло
  checkYouLuck() {
    return this.turnDice() % 2 === 0;
  }

  // расчет урона - равно = парирование, больше - урон врагу, меньше - урон игроку
  calculateFightHit(enemyAg) {
    const playerHit = this.turnDice() * 2 + this.playerAgility;
    const enemyHit = this.turnDice() * 2 + enemyAg;
    return playerHit === enemyHit ? 0 : playerHit > enemyHit ? 2 : -2;
  }

  // создание новой игры
  createNewGame() {
    this.calculatePlayerStat(); // проставляем статы
    this.playerHonor = 3; // честь
    this.playerHorse = 1; // лошадь
    this.playerSword = 1; // меч
    this.playerPistol = 1; // пистолет
    this.playerMoney = 15; // деньги
    this.playerGod = true; // обращение к богу
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

  // получить значение параметра по названию
  getParamValue(param) {
    return this[`player${this.strCapitalize(param)}`];
  }
  // получить название параметра
  getParamName(param) {
    switch (param) {
      case "strength":
        return "сила";
      case "agility":
        return "ловкость";
      case "honor":
        return "честь";
      case "money":
        return "деньги";
      case "food":
        return "еда";
      case "horse":
        return "лошадь";
      case "sword":
        return "меч";
      case "dagger":
        return "кинжал";
      case "pistol":
        return "пистолет";
      case "ammo":
        return "патроны";
      default:
        return null;
    }
  }
  // увеличение параметра на заданную величину
  increase(stat, count) {
    this[`player${this.strCapitalize(stat)}`] =
      this[`player${this.strCapitalize(stat)}`] + count;
  }
  // уменьшение параметра на заданную величину
  decrease(stat, count) {
    this[`player${this.strCapitalize(stat)}`] =
      this[`player${this.strCapitalize(stat)}`] - count;
  }

  store() {}

  // изменение текущего шага
  setCurrentStep(newCurrentStep) {
    if (this.currentStep !== newCurrentStep) {
      this.currentStep = newCurrentStep;
      this.historySteps.push(this.currentStep);
    }
  }

  // проверка есть ли сохраненные игры
  checkHaveSaveGame() {
    if (localStorage.getItem("shpaga-game-steps")) {
      this.canLoadSaveGame = true;
    }
  }
  // сохранение игры
  saveGame() {
    localStorage.setItem("shpaga-game-steps", this.historySteps);
  }
  // загрузка игры
  loadGame() {
    const steps = localStorage.getItem("shpaga-game-steps");
    this.historySteps = steps.split(",");
    this.currentStep = this.historySteps[this.historySteps.length - 1];
  }
  // удаление сохраненной игры
  removeSavedGames() {
    localStorage.removeItem("shpaga-game-steps");
    this.canLoadSaveGame = false;
  }
}
decorate(GameStore, {
  canLoadSaveGame: observable,
  currentStep: observable,
  listSteps: observable,
  historySteps: observable,
  playerAgility: observable,
  playerStrength: observable,
  playerHonor: observable,
  playerGod: observable,
  playerMoney: observable,
  playerFood: observable,
  playerInventory: observable,
  playerHorse: observable,
  playerSword: observable,
  playerDagger: observable,
  playerPistol: observable,
  playerAmmo: observable,
  show: observable,
  introText: observable,

  canLoadOldGame: computed,
  isShowIntro: computed,
  currentStepText: computed,
  turnDice: action,

  toggleIntro: action,
  openIntro: action,
  closeIntro: action,

  setCurrentStep: action,
  removeSavedGames: action,
  checkHaveSaveGame: action,
  saveGame: action,
  loadGame: action,

  decrease: action,
});

const gameStore = new GameStore();

autorun(() => {
  gameStore.checkHaveSaveGame();
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
      if (response.data.game) {
        gameStore.listSteps = response.data.game;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

export default gameStore;
export { GameStore };
