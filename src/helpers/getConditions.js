/**
 * Проверка наличия условия в строке
 * @param {*} str строка для поиска
 * @param {*} cond проверка наличия условия
 * @returns {boolean} наличие условия
 */
function findCondition(str, cond) {
  return str.indexOf(cond) !== -1 ? true : false;
}

/**
 * Возвращает результат сравнения двух переменных.
 * @param {*} a переменная 1
 * @param {*} b переменная 2
 * @param {*} cond оператор сравнения
 * @returns {boolean} результат сравнения
 */
function makeConditions(a, b, cond) {
  switch (cond) {
    case "et":
      return a == b;
    case "evt":
      return a === b;
    case "ne":
      return a != b;
    case "nev":
      return a !== b;
    case "gt":
      return a > b;
    case "lt":
      return a < b;
    case "gte":
      return a >= b;
    case "lte":
      return a <= b;
    default:
      return false;
  }
}

function multiCondition(str) {
  let parseStr = str;
  if (str.indexOf("&&")) {
    parseStr = str.split("&&");
  }
}

export function getConditions(str) {}
