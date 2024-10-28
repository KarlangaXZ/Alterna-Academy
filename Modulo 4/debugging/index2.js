function reverseString(input) {
    var reversedString = "";
    for (var i = input.length - 1; i >= 0; i--) {
        reversedString += input[i];
    }
    return reversedString;
}
var inputString = "Hello, World!";
var reversed = reverseString(inputString);
console.log("Input:", inputString);
console.log("Reversed:", reversed);
