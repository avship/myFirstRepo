"use strict";

const [title] = document.getElementsByTagName("h1");
const [startBtn, resetBtn] = document.getElementsByClassName("handler_btn");
const buttonPlus = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector('.rollback input[type="range"]');
const inputRangeValue = document.querySelector(
  '.rollback span[class="range-value"]'
);
const [total, totalCount, totalCountOther, fullTotalCount, totalCountRollback] =
  document.getElementsByClassName("total-input");

let screens = document.querySelectorAll(".screen");

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
  init: function () {
    appData.addTitle();

    startBtn.addEventListener("click", appData.start);
    buttonPlus.addEventListener("click", appData.addScreenBlock);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  addScreens: function () {
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
    console.log(appData.screens);
  },
  start: function () {
    //alert("ok");
    appData.addScreens();
    //appData.addScreens();
    // appData.asking();
    // appData.addPrices();
    // appData.getAllServicePrices();
    // appData.getFullPrice();
    // appData.getServicePercentPrices();
    // appData.getTitle();
    // appData.logger();
  },
  asking: function () {
    //Дополнительные услуги
    for (let i = 0; i < 2; i++) {
      const name = prompt("Какой дополнительный тип услуги нужен?");
      let tmpNum = appData.askNumber("Сколько это будет стоить?");

      appData.services[`service${i}`] = {
        name: name,
        price: tmpNum,
      };
    }
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
appData.init();
