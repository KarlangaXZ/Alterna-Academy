function calculateLetterFrequency(input) {
    var letterCountArray = [];
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var letter = input_1[_i];
        var foundLetterItem = undefined;
        for (var _a = 0, letterCountArray_1 = letterCountArray; _a < letterCountArray_1.length; _a++) {
            var item = letterCountArray_1[_a];
            if (item.letter === letter) {
                foundLetterItem = item;
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
function incrementLetterCount(item) {
    item.count += 1;
}
function createLetterItem(letter, frequencyMap) {
    frequencyMap.push({ letter: letter, count: 1 });
}
var inputString = "Pero que diablura del diablo es que esta pasando aqui diablazo";
var frequencyMap = calculateLetterFrequency(inputString);
printLetterFrequency(frequencyMap);
