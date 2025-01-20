let result: boolean | undefined = undefined;

function findPrimeNumbers(count: number, startingValue: number = 0): number[] {
    const primeNumbers = [];
    let currentValue = startingValue;

  function isPrime(number: number): boolean {
    if (number < 2) return false;
    for (let j = 2; j <= Math.sqrt(number); j++) {
      if (number % j === 0) {
        return false;
      }
    }
    return true;
  }

  while (primeNumbers.length < count) {
    result = isPrime(currentValue);
    if (result) {
      primeNumbers.push(currentValue);
    }
    currentValue += 1;
  }

  return primeNumbers;
}


function printPrimeNumbers(numbers: number[]): void {
  console.log("Prime Numbers:");
  numbers.forEach((number) => {
    console.log(number);
  });
}

const primeNumbers = findPrimeNumbers(25, 0);
printPrimeNumbers(primeNumbers);