"use strict";

const isNumber = function (testNum) {
  return String(testNum).match(/^\d+(\.\d+)?$/);
};
const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: false,

  rollback: Math.round(Math.random() * 100 + 0.5),
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  service1: "",
  service2: "",
  servicePrice1: 0,
  servicePrice2: 0,

  asking: function () {
    appData.title = prompt("Как называется проект?", "Калькулятор вёрстки");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, сложные"
    );
    do {
      appData.screenPrice = +prompt("Сколько будет стоить работа?", 15000);
    } while (!isNumber(appData.screenPrice));
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  getAllServicePrices: function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }

      let tmpNum = null;
      do {
        tmpNum = prompt("Сколько это будет стоить?");
      } while (!isNumber(tmpNum));
      sum += Number(tmpNum);
    }
    appData.allServicePrices = sum;
  },
  getTitle: function () {
    const newStr = appData.title.trim();
    appData.title = newStr[0].toUpperCase() + newStr.substring(1).toLowerCase();
  },
  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    appData.rollback =
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

    console.log(
      `Стоимость вёрстки экранов ${appData.screenPrice} юани и стоимость разработки сайта ${appData.fullPrice} юани`
    );
  },
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

appData.start();
