var leastCommonMultiple = function (a, b) {
    return (a * b) / greatestCommonDivisor(a, b);
};
var greatestCommonDivisor = function (a, b) {
    if (a == 0)
        return b;
    return greatestCommonDivisor(b % a, a);
};
var num1 = 12;
var num2 = 65536;
var lcd = leastCommonMultiple(num1, num2);
console.log("The LCM of ".concat(num1, " and ").concat(num2, " is:"), lcd);
console.log(greatestCommonDivisor(num1, num2));
