import { observable, computed, autorun, action, decorate } from "mobx";
import axios from "axios";

class GameStore {
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

  @observable player = {
    characteristics: {
      agility: 0,
      agilityMax: 0,
      strength: 0,
      strengthMax: 0,
      special: null,
      honor: 0,
      god: false,
      money: 0,
      food: 2,
      inventoryMax: 5,
    },
    inventory: {
      horse: 0,
      sword: 0,
      dagger: 0,
      pistol: 0,
      rifle: 0,
      ammo: 0,
    },
  };

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
    this.player.characteristics.strengthMax = this.strengthStatList[
      strengthDice - 1
    ];
    this.player.characteristics.strength = this.strengthStatList[
      strengthDice - 1
    ];

    let agilityDice = this.turnDice();
    this.player.characteristics.agilityMax = this.agilityStatList[
      agilityDice - 1
    ];
    this.player.characteristics.agility = this.agilityStatList[agilityDice - 1];
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
    const playerHit = this.turnDice() * 2 + this.player.characteristics.agility;
    const enemyHit = this.turnDice() * 2 + enemyAg;
    return playerHit === enemyHit ? 0 : playerHit > enemyHit ? 2 : -2;
  }

  // создание новой игры
  @action createNewGame() {
    this.calculatePlayerStat(); // проставляем статы

    this.player.characteristics.special = null; // абилка
    this.player.characteristics.honor = 3; // честь
    this.player.characteristics.god = true; // обращение к богу
    this.player.characteristics.money = 15; // деньги
    this.player.characteristics.food = 2; // еда
    this.player.inventory.horse = 1; // лошадь
    this.player.inventory.sword = 1; // меч
    this.player.inventory.dagger = 1; // кинжавл
    this.player.inventory.pistol = 1; // пистолет
    this.player.inventory.rifle = 0; // аркебуза
    this.player.inventory.ammo = 0; // патроны
    this.playerInventory = []; // инвентарь игрока

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
      case "rifle":
        return "аркебуза";
      case "ammo":
        return "патроны";
      default:
        return null;
    }
  }
  // увеличение параметра на заданную величину
  @action increase(stat, count) {
    if (stat === "strength" && count === "full") {
      this.player.characteristics.strength = this.player.characteristics.strengthMax;
    } else {
      const charOrInv = this.checkCharOrInv(stat);
      this.player[charOrInv][stat] = this.player[charOrInv][stat] + count;
    }
  }
  // уменьшение параметра на заданную величину
  @action decrease(stat, count) {
    const charOrInv = this.checkCharOrInv(stat);
    this.player[charOrInv][stat] = this.player[charOrInv][stat] - count;
  }

  @action checkCharOrInv(stat) {
    if (stat in this.player.characteristics) {
      return "characteristics";
    } else {
      return "inventory";
    }
  }

  // проверка объема инвентаря
  @action checkInventory() {
    const sword =
      this.player.inventory.sword - 1 >= 0
        ? this.player.inventory.sword - 1
        : 0;
    const dagger =
      this.player.inventory.dagger - 1 >= 0
        ? this.player.inventory.dagger - 1
        : 0;
    const pistol =
      this.player.inventory.pistol - 2 >= 0
        ? this.player.inventory.pistol - 2
        : 0;

    return sword +
      dagger +
      pistol +
      this.playerInventory.length +
      this.player.inventory.rifle >=
      this.player.characteristics.inventoryMax
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
              this.player.characteristics.special === "swordAndDagger" &&
              this.player.inventory.dagger > 0 &&
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
              this.player.characteristics.special === "swordAndDagger" &&
              this.player.inventory.dagger > 0 &&
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
    const playerHit = playerDice * 2 + this.player.characteristics.agility; // сила удара игрока
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
      if (response.data.charStatStrength) {
        gameStore.strengthStatList = response.data.charStatStrength;
      }
      if (response.data.charStatAgility) {
        gameStore.agilityStatList = response.data.charStatAgility;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

export default gameStore;
export { GameStore };
