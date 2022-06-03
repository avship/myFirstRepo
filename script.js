"use strict";
const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = Math.round(Math.random() * 100 + 0.5);
//const fullPrice = 240000;
const adaptive = confirm("Нужен ли адаптив на сайте?");

const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");

const getAllServicePrices = function () {
  return Array.from(arguments).reduce(function (resCalc, newVal) {
    return resCalc + newVal;
  });
};

function getFullPrice(screenPrice, allServicePrices) {
  return screenPrice * allServicePrices;
}
function getTitle(input) {
  const newStr = input.trim();
  return input[0].toUpperCase() + input.substring(1).toLowerCase();
}
function getServicePercentPrices() {
  return Math.ceil(fullPrice - rollback);
}
function showTypeOf(variable) {
  console.log(typeof variable);
}
function getRollbackMessage(tempPrice) {
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
}

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
const fullPrice = getFullPrice(screenPrice, allServicePrices);
const servicePercentPrice = getServicePercentPrices();

console.log(screens.toLowerCase().split(", "));
getRollbackMessage(fullPrice);
console.log(servicePercentPrice);

showTypeOf(title);
showTypeOf(screens);
showTypeOf(screenPrice);
showTypeOf(rollback);
showTypeOf(adaptive);
showTypeOf(service1);
showTypeOf(servicePrice1);
showTypeOf(service2);
showTypeOf(servicePrice2);

console.log(screens);
