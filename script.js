let num = 266219;

let productDigits = 1;
while (num !== 0) {
  const lastDigit = num % 10;
  //console.log(lastDigit);
  productDigits *= lastDigit;
  num = Math.round(num / 10);
}
let power3 = productDigits ** 3;
console.log(String(power3).slice(0, 2));
