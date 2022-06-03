"use strict";

const isNumber = function (num) {
  num = String(num);
  return (
    (num.match(/^\d+(\.\d+)?$/) && !isNaN(parseFloat(num)) && isFinite(num)) ===
    true
  );
};

console.log(isNumber(null));
console.log(isNumber("      2345         "));
console.log(isNumber("2345"));
console.log(isNumber("2345.56"));
