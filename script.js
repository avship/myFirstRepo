"use strict";

//часть 1
const arr = ["123", "567", "9873", "6013", "456", "222", "777"];
arr.forEach((element) => {
  if (element.match(/^[24]/)) {
    console.log(element);
  }
});

//часть 2 простые числа
function isPrime(n) {
  for (let divisor = 2; divisor < n; divisor++) {
    if (n % divisor === 0) {
      return false;
    }
  }
  return true;
}
console.log(4, isPrime(4));
let counter = 1;
for (let n = 2; n <= 100; n++) {
  if (isPrime(n)) {
    console.log(`${counter} Делители этого числа: 1 и ${n}`);
    counter++;
  }
}
