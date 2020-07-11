import optionsStore from "./optionsStore";
import ButtonStore from "./ButtonStore";
import FioStore from "./FioStore";
import EmailStore from "./EmailStore";

class mainStore {
    constructor() {
        /**
         * Инициализация дочерних хранилищ
         */
        this.ButtonStore = new ButtonStore();      
        this.FioStore = new FioStore();
        this.EmailStore = new EmailStore(); }
      }