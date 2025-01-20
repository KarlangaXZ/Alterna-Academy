const randomArrayLength = 1000;
const randomNumbers = [];

for (let i = 0; i < randomArrayLength; i++) {
    randomNumbers.push(Math.round(Math.random() * 100));
}

function filterArray(
    array: number[],
    filterFunction: (store: number[]) => void,
) {
    console.log(`initial store size:${array.length}`);
    filterFunction(array);
    console.log(`final store size:${array.length}`);
}

filterArray(randomNumbers, (store) => {
    const evenNumbers = store.filter((item) => item % 2 === 0);
    store.splice(0, store.length, ...evenNumbers);
});