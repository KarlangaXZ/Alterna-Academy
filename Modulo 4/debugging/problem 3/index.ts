/* Sorts array of numbers in descending order. */

function simpleInsertionSort(values: number[]): number[] {
    if (values.length <= 1) {
      return values;
    }
  
    const result: number[] = [];
    values.forEach((value) => {
      if (result.length === 0) {
        result.push(value);
      } else {
        let insertionIndex = result.findIndex(
          (resultValue) => resultValue < value
        );
        result.splice(insertionIndex === -1 ? result.length : insertionIndex, 0, value);
        console.info(result)
      }
    });
  
    return result;
  }
  
  const sequence = [1, 12, 3, 4, 5, 16, 7, 8, 9, 15, 20, 300, 52];
  const sorted = simpleInsertionSort(sequence);
  console.log(sorted);