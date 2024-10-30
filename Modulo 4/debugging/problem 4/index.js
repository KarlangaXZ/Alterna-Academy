var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function calculateLetterFrequency(input) {
    var letterCountArray = [];
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var letter = input_1[_i];
        var foundLetterItem = undefined;
        for (var _a = 0, letterCountArray_1 = letterCountArray; _a < letterCountArray_1.length; _a++) {
            var item = letterCountArray_1[_a];
            if (item.letter === letter) {
                foundLetterItem = __assign({}, item);
            }
        }
        if (foundLetterItem) {
            incrementLetterCount(foundLetterItem);
        }
        else {
            createLetterItem(letter, letterCountArray);
        }
    }
    return letterCountArray;
}
function printLetterFrequency(frequencyMap) {
    console.log("Letter Frequency:");
    for (var _i = 0, frequencyMap_1 = frequencyMap; _i < frequencyMap_1.length; _i++) {
        var item = frequencyMap_1[_i];
        console.log("".concat(item.letter, ": ").concat(item.count));
    }
}
console.info(incrementLetterCount);
function incrementLetterCount(item) {
    item.count += 1;
}
console.info(incrementLetterCount);
function createLetterItem(letter, frequencyMap) {
    frequencyMap.push({ letter: letter, count: 0 });
}
var inputString = "This is a problem about pass by value versus passing by reference.";
var frequencyMap = calculateLetterFrequency(inputString);
printLetterFrequency(frequencyMap);
