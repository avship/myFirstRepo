let num = 266219;
let productDigits = 1;
let power3 = null;
while (num !== 0) {
  const lastDigit = num % 10;
  //console.log(lastDigit);
  productDigits *= lastDigit;
  num = Math.floor(num / 10);
}
power3 = productDigits ** 3;
console.log(String(power3).slice(0, 2));
