"use strict";

//appData.start();
const [frontCalculator] = document.getElementsByTagName("h1");
const [calcBtn, resetBtn] = document.getElementsByClassName("handler_btn");
const plusElement = document.querySelector(".screen-btn");

const othersPercent = document.querySelectorAll(".other-items.percent");
const othersNumber = document.querySelectorAll(".other-items.number");

const inpRange = document.querySelector('.rollback input[type="range"]');
const spanRangeValue = document.querySelector(
  '.rollback span[class="range-value"]'
);
const [frontPrice, nScreens, nExtraServices, totalPrice, rollbackPrice] =
  document.getElementsByClassName("total-input");

let screenElements = document.querySelectorAll(".screen");
console.log(frontCalculator);
console.log(calcBtn, resetBtn);
console.log(plusElement);
console.log(othersPercent);
console.log(othersNumber);
console.log(inpRange);
console.log(spanRangeValue);
console.log(frontPrice, nScreens, nExtraServices, totalPrice, rollbackPrice);

const isNumber = function (testNum) {
  return String(testNum).match(/^\d+(\.\d+)?$/);
};
const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: false,

  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  services: {},
  servicePrice: 0,

  asking: function () {
    appData.title = appData.askString(
      "Как называется проект?",
      "Калькулятор вёрстки"
    );
    // appData.screens = appData.askArrayOfStrings(
    //   "Какие типы экранов нужно разработать?",
    //   "Простые, сложные"
    // );
    // appData.screenPrice = appData.askNumber("Сколько будет стоить эта работа?");
    for (let i = 0; i < 2; i++) {
      const name = prompt("Какие типы экранов нужно разработать?");
      const price = appData.askNumber("Сколько будет стоить данная работа?");
      appData.screens.push({
        id: i,
        name: name,
        price: price,
      });
    }

    //Дополнительные услуги
    for (let i = 0; i < 2; i++) {
      const name = prompt("Какой дополнительный тип услуги нужен?");
      let tmpNum = appData.askNumber("Сколько это будет стоить?");

      appData.services[`service${i}`] = {
        name: name,
        price: tmpNum,
      };
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    //ScreenPrice sum
    // for (const screen of appData.screens) {
    //   appData.screenPrice += screen.price;
    // }
    //reduce
    appData.screenPrice = appData.screens.reduce(
      (previousValue, currentValue) => previousValue + currentValue.price,
      0
    );
  },
  askArrayOfStrings: function () {
    let tempAr = [];
    for (let i = 0; i < 2; i++) {
      const name = appData.askString("Какие типы экранов нужно разработать?");
      const price = appData.askNumber("Сколько будет стоить работа?", 3000);
      tempAr.push({ id: i, name: name, price: price });
    }
    return tempAr;
  },
  askNumber: function (question, answer) {
    let price = null;
    do {
      price = +prompt(question, answer);
    } while (!isNumber(price));
    return price;
  },
  askString: function (question, baseAnswer) {
    let answer = null;
    do {
      answer = prompt(question, baseAnswer).trim();
    } while (answer === null || !answer.match(/^[A-Za-zА-Яа-яёЁ]/));
    return answer;
  },
  getAllServicePrices: function () {
    for (const key in appData.services) {
      appData.allServicePrices += appData.services[key]["price"];
    }
  },
  getTitle: function () {
    const newStr = appData.title.trim();
    appData.title = newStr[0].toUpperCase() + newStr.substring(1).toLowerCase();
  },
  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  getRollbackMessage: function () {
    switch (true) {
      case fullPrice >= 30000:
        console.log("Даем скидку в 10%");
        break;
      case fullPrice >= 15000:
        console.log("Даем скидку в 5%");
        break;
      case fullPrice >= 0:
        console.log("Скидка не предусмотрена");
        break;
      default:
        console.log("Что-то пошло не так");
    }
  },
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getAllServicePrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();

    appData.logger();
  },
  logger: function () {
    // for (const key in appData) {
    //   if (typeof appData[key] !== "function") console.log(key, appData[key]);
    // }
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};
