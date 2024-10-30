function reverseString(input: string): string {
  let reversedString = "";
  for (let i = input.length - 1; i >= 0; i--) {
    reversedString += input[i];
  }
  return reversedString;
}

const inputString = "Hello, World!";
const reversed = reverseString(inputString);

console.log("Input:", inputString);
console.log("Reversed:", reversed);
