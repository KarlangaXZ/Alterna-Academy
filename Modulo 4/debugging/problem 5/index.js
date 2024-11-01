/*
Problem statement: Program that calculates the average roll of
a D100 for ROLL_ITERATIONS. Please test and advise.
*/
var ROLL_ITERATIONS = 10000000;
function main() {
    var sumRolls = 0;
    for (var iterator = 0; iterator < ROLL_ITERATIONS; iterator = iterator + 1) {
        var diceValue = Math.random() * 100;
        sumRolls += diceValue;
    }
    var average = sumRolls / ROLL_ITERATIONS;
    console.log("average dice roll value: ".concat(average));
}
main();
