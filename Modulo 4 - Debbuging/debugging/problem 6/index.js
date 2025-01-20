var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var randomArrayLength = 1000;
var randomNumbers = [];
for (var i = 0; i < randomArrayLength; i++) {
    randomNumbers.push(Math.round(Math.random() * 100));
}
function filterArray(array, filterFunction) {
    console.log("initial store size:".concat(array.length));
    filterFunction(array);
    console.log("final store size:".concat(array.length));
}
filterArray(randomNumbers, function (store) {
    var evenNumbers = store.filter(function (item) { return item % 2 === 0; });
    store.splice.apply(store, __spreadArray([0, store.length], evenNumbers, false));
});
