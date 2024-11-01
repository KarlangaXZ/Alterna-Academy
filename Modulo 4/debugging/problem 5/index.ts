/*
Problem statement: Program that calculates the average roll of
a D100 for ROLL_ITERATIONS. Please test and advise.
*/


const ROLL_ITERATIONS = 10000000;

function main() {
    let sumRolls = 0;

    for (let iterator = 0; iterator < ROLL_ITERATIONS; iterator = iterator + 1) {
        const diceValue =  Math.round(Math.random() * 100);
        sumRolls += diceValue;
    }

    const average = sumRolls / ROLL_ITERATIONS;

    console.log(`average dice roll value: ${average}`);
}

main();