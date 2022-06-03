"use strict";
function lesson4HardFunction(str) {
  if (typeof str !== "string") {
    console.log("Эта функция должна на вход получать объект типа string");
    return null;
  }
  str = str.trim();
  if (str.length > 30) {
    str = str.slice(0, 27) + "...";
  }
  return str;
}

const checker = lesson4HardFunction(
  "asssssddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddhhhhhhhhhhhfldddddd"
);
console.log(checker);
const checker1 = lesson4HardFunction(123);
console.log(checker1);

const checker2 = lesson4HardFunction("Hello world");
console.log(checker2);
("use strict");
let title;
let screens;
let screenPrice;
let adaptive;

let rollback;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

let service1;
let service2;
let servicePrice1;
let servicePrice2;

const isNumber = function (testNum) {
  return String(testNum).match(/^\d+(\.\d+)?$/) === true;
};
const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
    }

    let tmpNum = null;
    do {
      tmpNum = prompt("Сколько это будет стоить?");
    } while (!isNumber(tmpNum));
    sum += Number(tmpNum);
  }
  return sum;
};
const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};
const getFullPrice = function () {
  return screenPrice + allServicePrices;
};
const getServicePercentPrices = function () {
  return fullPrice - fullPrice * (rollback / 100);
};

allServicePrices = getAllServicePrices;
