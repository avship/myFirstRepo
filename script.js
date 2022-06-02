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

const fullPrice = screenPrice + servicePrice1 + servicePrice2;

const servicePercentPrice = Math.ceil(fullPrice - rollback);
console.log(servicePercentPrice);

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
