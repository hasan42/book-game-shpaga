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
  introText = "";

  canLoadSaveGame = false; // есть ли сохраненные игры
  currentStep = 0; // текущий шаг
  listSteps = []; // список шагов
  historySteps = []; // история шагов

  specialList = []; // список возможных специальных сил
  ifHonorGoesZero = 150; // если честь упала до нуля

  playerAgilityMax = 0; // максимальная ловкость
  playerStrengthMax = 0; // максимальная сила
  playerAgility = 0; // текущая ловкость
  playerStrength = 0; // текущая сила
  playerSpecial = null; // особая сила
  playerHonor = 0; // количество чести
  playerGod = false; // обратиться к богу. Максимум 1 раз
  playerMoney = 0; // количество денег
  playerFood = 2; // количество еды. Максимально 2
  playerInventoryMax = 5; // максимальное количество предметов в инвентаре
  playerInventory = []; // инвентарь игрока
  playerHorse = 0; // лошадь игрока
  playerSword = 0; // меч игрока
  playerDagger = 0; // кинжавл игрока
  playerPistol = 0; // пистолет игрока
  playerRifle = 0; // аркебуза
  playerAmmo = 0; // патроны игрока

  roadMapList = [];

  constructor() {
    this.createNewGame();
  }

  get showIntroText() {
    return this.introText;
  }

  // получить информацию по текущему шагу
  get currentStepText() {
    return this.listSteps.find((step) => step.id === Number(this.currentStep));
  }

  // получение шага по ИД
  getStepById(id) {
    return this.listSteps[Number(id) - 1];
  }

  checkRoadMap(id) {
    if (this.roadMapList.find((el) => el === id)) {
      return false;
    } else {
      this.roadMapList.push(id);
      return true;
    }
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

  setSpecial(spec) {
    this.playerSpecial = spec;
  }

  // делает заглавной первую букву слова
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
    if (stat === "strength" && count === "full") {
      this.playerStrength = this.playerStrengthMax;
    } else {
      this[`player${this.strCapitalize(stat)}`] =
        this[`player${this.strCapitalize(stat)}`] + count;
    }
  }
  // уменьшение параметра на заданную величину
  decrease(stat, count) {
    this[`player${this.strCapitalize(stat)}`] =
      this[`player${this.strCapitalize(stat)}`] - count;
  }

  // проверка объема инвентаря
  checkInventory() {
    const sword = this.playerSword - 1 >= 0 ? this.playerSword - 1 : 0;
    const dagger = this.playerDagger - 1 >= 0 ? this.playerDagger - 1 : 0;
    const pistol = this.playerPistol - 2 >= 0 ? this.playerPistol - 2 : 0;

    return sword +
      dagger +
      pistol +
      this.playerInventory.length +
      this.playerRifle >=
      this.playerInventoryMax
      ? true
      : false;
  }

  store() {}

  // атака. список врагов, ид атакующего
  attack(enemyList, enemyAttacker) {
    let resultFight = 0; // результат схватки
    // console.log(enemyList);
    enemyList.forEach((en, idx) => {
      const enemyHit = this.calculateHit(en.agility); // расчет силы удара

      if (en.strength > 0) {
        // если враг не побежден
        if (idx !== enemyAttacker) {
          // НЕ цель атаки
          if (enemyHit.hit === "damaged") {
            // враг попал - отнять 2е силы игрока
            this.decrease("strength", 2);
          }
        } else {
          // цель атаки
          if (enemyHit.hit === "attack") {
            // атака
            if (
              this.playerSpecial === "swordAndDagger" &&
              this.playerDagger > 0 &&
              enemyHit.isEven
            ) {
              // если четное и умение - шпага+кинжал - отнимаем 3
              console.log("атака playerSpecial");
              resultFight = 3;
            } else {
              resultFight = 2;
            }
          } else if (enemyHit.hit === "damaged") {
            // проиграл
            this.decrease("strength", 2);
            if (
              this.playerSpecial === "swordAndDagger" &&
              this.playerDagger > 0 &&
              enemyHit.isEven
            ) {
              console.log("проиграл playerSpecial");
              // если четное и умение - шпага+кинжал - отнимаем 2
              resultFight = 2;
            } else {
              resultFight = 0;
            }
          } else {
            //парирование
            resultFight = 0;
          }
        }
      }
    });

    // возвращаем урон по врагу
    return resultFight;
  }

  // расчет удара
  calculateHit(agility) {
    const enemyHit = this.turnDice() * 2 + agility; // сила удара врага
    const playerDice = this.turnDice(); // кубик игрока
    const playerHit = playerDice * 2 + this.playerAgility; // сила удара игрока
    const isEven = playerDice % 2 === 0 ? true : false; // проверка на четность

    if (playerHit === enemyHit) {
      // если равно - парирование
      return { hit: "miss", isEven: isEven };
    } else if (playerHit > enemyHit) {
      // если у игрока больше - удар по врагу
      return { hit: "attack", isEven: isEven };
    } else {
      // если у врага больше - удар по игроку
      return { hit: "damaged", isEven: isEven };
    }
  }

  // изменение текущего шага
  setCurrentStep(newCurrentStep) {
    if (this.currentStep !== newCurrentStep) {
      this.currentStep = newCurrentStep;
      this.historySteps.push(this.currentStep);
    }
  }

  // возвращает можно ли загрузить игру
  get canLoadOldGame() {
    return this.canLoadSaveGame;
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
    this.canLoadSaveGame = true;
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
  currentStep: observable,
  listSteps: observable,
  historySteps: observable,

  introText: observable,

  calculatePlayerStat: action,
  playerAgility: observable,
  playerStrength: observable,
  playerHonor: observable,
  playerSpecial: observable,
  playerGod: observable,
  playerMoney: observable,
  playerFood: observable,
  playerInventory: observable,
  playerHorse: observable,
  playerSword: observable,
  playerDagger: observable,
  playerPistol: observable,
  playerAmmo: observable,
  setSpecial: action,

  currentStepText: computed,
  getStepById: action,
  turnDice: action,

  canLoadOldGame: computed,
  canLoadSaveGame: observable,
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
    .get(process.env.PUBLIC_URL + "/shpaga.json", {
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
      if (response.data.special) {
        gameStore.specialList = response.data.special;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

export default gameStore;
export { GameStore };
