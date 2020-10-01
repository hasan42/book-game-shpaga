import { observable, computed, autorun, action, decorate } from "mobx";
import axios from "axios";

export class GameStore {
  @observable introText = "";

  @observable canLoadSaveGame = false; // есть ли сохраненные игры
  @observable currentStep = 0; // текущий шаг
  @observable listSteps = []; // список шагов
  @observable historySteps = []; // история шагов

  @observable fightRound = 0; // раунд битвы

  @observable specialList = []; // список возможных специальных сил
  @observable ifHonorGoesZero = 150; // если честь упала до нуля

  @observable strengthStatList = []; // список дя генерации значения силы персонажа
  @observable agilityStatList = []; // список дя генерации значения ловкости персонажа

  @observable playerAgilityMax = 0; // максимальная ловкость
  @observable playerStrengthMax = 0; // максимальная сила
  @observable playerAgility = 0; // текущая ловкость
  @observable playerStrength = 0; // текущая сила

  @observable playerSpecial = null; // особая сила
  @observable playerHonor = 0; // количество чести
  @observable playerGod = false; // обратиться к богу. Максимум 1 раз
  @observable playerMoney = 0; // количество денег
  @observable playerFood = 2; // количество еды. Максимально 2
  @observable playerInventoryMax = 5; // максимальное количество предметов в инвентаре
  @observable playerInventory = []; // инвентарь игрока
  @observable playerHorse = 0; // лошадь игрока
  @observable playerSword = 0; // меч игрока
  @observable playerDagger = 0; // кинжавл игрока
  @observable playerPistol = 0; // пистолет игрока
  @observable playerRifle = 0; // аркебуза
  @observable playerAmmo = 0; // патроны игрока

  @observable playerHeroImage = "/images/hero/hero.png"; // картинка персонажа

  @observable roadMapList = [];

  constructor() {
    this.checkHaveSaveGame();
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
          this.introText = response.data.intro;
        }
        if (response.data.game) {
          this.listSteps = response.data.game;
        }
        if (response.data.special) {
          this.specialList = response.data.special;
        }
        if (response.data.charStatStrength) {
          this.strengthStatList = response.data.charStatStrength;
        }
        if (response.data.charStatAgility) {
          this.agilityStatList = response.data.charStatAgility;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    this.createNewGame();
  }

  @computed get showIntroText() {
    return this.introText;
  }

  // получить информацию по текущему шагу
  @computed get currentStepText() {
    return this.listSteps.find((step) => step.id === Number(this.currentStep));
  }

  // получение шага по ИД
  @action getStepById(id) {
    return this.listSteps[Number(id) - 1];
  }

  @action checkRoadMap(id) {
    if (this.roadMapList.find((el) => el === id)) {
      return false;
    } else {
      this.roadMapList.push(id);
      return true;
    }
  }

  // кидать кубик
  @action turnDice(min = 1, max = 6) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  // расчет характеристик игрока
  @action calculatePlayerStat() {
    let strengthDice = this.turnDice();
    this.playerStrengthMax = this.strengthStatList[strengthDice - 1];
    this.playerStrength = this.strengthStatList[strengthDice - 1];

    let agilityDice = this.turnDice();
    this.playerAgilityMax = this.agilityStatList[agilityDice - 1];
    this.playerAgility = this.agilityStatList[agilityDice - 1];
  }

  @action setSpecial(spec) {
    this.playerSpecial = spec;
  }

  // делает заглавной первую букву слова
  @action strCapitalize(str) {
    const strCapitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return strCapitalized;
  }

  // проверка удачи четно - повезло, нечетно - не повезло
  @action checkYouLuck() {
    return this.turnDice() % 2 === 0;
  }

  // расчет урона - равно = парирование, больше - урон врагу, меньше - урон игроку
  @action calculateFightHit(enemyAg) {
    const playerHit = this.turnDice() * 2 + this.playerAgility;
    const enemyHit = this.turnDice() * 2 + enemyAg;
    return playerHit === enemyHit ? 0 : playerHit > enemyHit ? 2 : -2;
  }

  // создание новой игры
  @action createNewGame() {
    this.calculatePlayerStat(); // проставляем статы
    this.playerSpecial = null; // абилка
    this.playerHonor = 3; // честь
    this.playerGod = true; // обращение к богу
    this.playerMoney = 15; // деньги
    this.playerFood = 2; // еда
    this.playerInventory = []; // инвентарь игрока
    this.playerHorse = 1; // лошадь
    this.playerSword = 1; // меч
    this.playerDagger = 0; // кинжавл игрока
    this.playerPistol = 1; // пистолет
    this.playerRifle = 0; // аркебуза
    this.playerAmmo = 0; // патроны игрока

    this.removeSavedGames(); // удаляем сохранение
  }

  // получить значение параметра по названию
  @action getParamValue(param) {
    return this[`player${this.strCapitalize(param)}`];
  }
  // получить название параметра
  @action getParamName(param) {
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
  @action increase(stat, count) {
    if (stat === "strength" && count === "full") {
      this.playerStrength = this.playerStrengthMax;
    } else {
      this[`player${this.strCapitalize(stat)}`] =
        this[`player${this.strCapitalize(stat)}`] + count;
    }
  }
  // уменьшение параметра на заданную величину
  @action decrease(stat, count) {
    this[`player${this.strCapitalize(stat)}`] =
      this[`player${this.strCapitalize(stat)}`] - count;
  }

  // проверка объема инвентаря
  @action checkInventory() {
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

  @action store() {}

  // атака. список врагов, ид атакующего
  @action attack(enemyList, enemyAttacker, disabledEnemyStrength) {
    this.fightRound += 1; // прибавляем номер раунда

    let resultFight = 0; // результат схватки
    // console.log(enemyList);
    enemyList.forEach((en, idx) => {
      const enemyHit = this.calculateHit(en.agility); // расчет силы удара

      if (en.strength > disabledEnemyStrength) {
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
  @action calculateHit(agility) {
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
  @action setCurrentStep(newCurrentStep) {
    if (this.currentStep !== newCurrentStep) {
      this.currentStep = newCurrentStep;
      this.historySteps.push(this.currentStep);
    }
  }

  // возвращает можно ли загрузить игру
  @computed get canLoadOldGame() {
    return this.canLoadSaveGame;
  }
  // проверка есть ли сохраненные игры
  @action checkHaveSaveGame() {
    if (localStorage.getItem("shpaga-game-steps")) {
      this.canLoadSaveGame = true;
    }
  }
  // сохранение игры
  @action saveGame() {
    localStorage.setItem("shpaga-game-steps", this.historySteps);
    this.canLoadSaveGame = true;
  }
  // загрузка игры
  @action loadGame() {
    const steps = localStorage.getItem("shpaga-game-steps");
    this.historySteps = steps.split(",");
    this.currentStep = this.historySteps[this.historySteps.length - 1];
  }
  // удаление сохраненной игры
  @action removeSavedGames() {
    localStorage.removeItem("shpaga-game-steps");
    this.canLoadSaveGame = false;
  }
}
// decorate(GameStore, {
//   currentStep: observable,
//   listSteps: observable,
//   historySteps: observable,

//   introText: observable,

//   fightRound: observable,

//   calculatePlayerStat: action,
//   playerAgility: observable,
//   playerStrength: observable,
//   playerHonor: observable,
//   playerSpecial: observable,
//   playerGod: observable,
//   playerMoney: observable,
//   playerFood: observable,
//   playerInventory: observable,
//   playerHorse: observable,
//   playerSword: observable,
//   playerDagger: observable,
//   playerPistol: observable,
//   playerAmmo: observable,
//   setSpecial: action,

//   currentStepText: computed,
//   getStepById: action,
//   turnDice: action,

//   canLoadOldGame: computed,
//   canLoadSaveGame: observable,
//   setCurrentStep: action,
//   removeSavedGames: action,
//   checkHaveSaveGame: action,
//   saveGame: action,
//   loadGame: action,

//   decrease: action,
// });

// const gameStore = new GameStore();

// autorun(() => {
//   gameStore.checkHaveSaveGame();
//   axios
//     .get(process.env.PUBLIC_URL + "/shpaga.json", {
//       dataType: "jsonp",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     })
//     .then((response) => {
//       if (response.data.intro) {
//         gameStore.introText = response.data.intro;
//       }
//       if (response.data.game) {
//         gameStore.listSteps = response.data.game;
//       }
//       if (response.data.special) {
//         gameStore.specialList = response.data.special;
//       }
//       if (response.data.charStatStrength) {
//         gameStore.strengthStatList = response.data.charStatStrength;
//       }
//       if (response.data.charStatAgility) {
//         gameStore.agilityStatList = response.data.charStatAgility;
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// export default gameStore;
// export { GameStore };
