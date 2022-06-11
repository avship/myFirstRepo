"use strict";

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

  services: [],
  servicePrice1: 0,
  servicePrice2: 0,

  asking: function () {
    appData.title = appData.askString(
      "Как называется проект?",
      "Калькулятор вёрстки"
    );
    appData.screens = appData.askArrayOfStrings(
      "Какие типы экранов нужно разработать?",
      "Простые, сложные"
    );

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
  },
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

appData.start();
