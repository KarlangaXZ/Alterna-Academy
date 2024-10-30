/* Sorts array of numbers in descending order. */
function simpleInsertionSort(values) {
    if (values.length <= 1) {
        return values;
    }
    var result = [];
    values.forEach(function (value) {
        if (result.length === 0) {
            result.push(value);
        }
        else {
            var insertionIndex = result.findIndex(function (resultValue) { return resultValue < value; });
            result.splice(insertionIndex === -1 ? result.length : insertionIndex, 0, value);
            console.info(result);
        }
    });
    return result;
}
var sequence = [1, 12, 3, 4, 5, 16, 7, 8, 9, 15, 20, 300, 52];
var sorted = simpleInsertionSort(sequence);
console.log(sorted);
