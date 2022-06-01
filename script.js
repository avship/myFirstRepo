const title = "Проект lesson 2";
const screens = '("Простые, Сложные, Интерактивные")';
const screenPrice = 777;
const rollback = Math.round(Math.random() * 100 + 0.5);
const fullPrice = 240000;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(`Длина переменной screens: ${screens.length}`);
console.log(
  `Стоимость верстки экранов (${screenPrice}) рублей/ долларов/гривен/юани`
);
console.log(
  `Стоимость разработки сайта (${fullPrice}) рублей/ долларов/гривен/юани`
);
console.log(screens.toLowerCase().split(","));
console.log(
  `Процент отката посреднику за работу ${fullPrice * (rollback / 100)}`
);
