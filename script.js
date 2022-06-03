"use strict";

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

const asking = function () {
  title = prompt("Как называется проект?", "Калькулятор вёрстки");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");
  do {
    screenPrice = +prompt("Сколько будет стоить работа?", 15000);
  } while (!isNumber(screenPrice));
  adaptive = confirm("Нужен ли адаптив на сайте?");
};
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
const getTitle = function () {
  const newStr = title.trim();
  title = newStr[0].toUpperCase() + newStr.substring(1).toLowerCase();
};
const getFullPrice = function () {
  return screenPrice + allServicePrices;
};
const getServicePercentPrices = function () {
  return fullPrice - fullPrice * (rollback / 100);
};
const getRollbackMessage = function () {
  switch (true) {
    case tempPrice >= 30000:
      console.log("Даем скидку в 10%");
      break;
    case tempPrice >= 15000:
      console.log("Даем скидку в 5%");
      break;
    case tempPrice >= 0:
      console.log("Скидка не предусмотрена");
      break;
    default:
      console.log("Что-то пошло не так");
  }
};
asking();
allServicePrices = getAllServicePrices;
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screen.length);
console.log(servicePercentPrice);

console.log(
  `Стоимость вёрстки экранов ${screenPrice} юани и стоимость разработки сайта ${fullPrice} юани`
);
