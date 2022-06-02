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
