"use strict";
//Выбираем значение переменной lang меняем true и false
const lang = true ? "ru" : "en";

if (lang == "ru") {
  console.log(
    "Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье"
  );
} else {
  console.log("Monday, tuesday, wednesday, thursday, friday, saturday, sunday");
}
console.log("");
switch (lang) {
  case "en":
    console.log(
      "Monday, tuesday, wednesday, thursday, friday, saturday, sunday"
    );
    break;
  case "ru":
    console.log(
      "Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье"
    );
    break;
  default:
    console.log("Ошибка");
}
const days = [
  ["Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье"],
  ["Monday, tuesday, wednesday, thursday, friday, saturday, sunday"],
];

// Вывод ныжной строчки

console.log(days[lang === "ru" ? 0 : 1]);
