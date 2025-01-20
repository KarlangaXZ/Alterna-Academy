function calculateLetterFrequency(input: string) {
  const letterCountArray: { letter: string; count: number }[] = [];

  for (const letter of input) {
    let foundLetterItem: { letter: string; count: number } | undefined =
      undefined;
    for (const item of letterCountArray) {
      if (item.letter === letter) {
        foundLetterItem = item;
      }
    }

    if (foundLetterItem) {
      incrementLetterCount(foundLetterItem);
    } else {
      createLetterItem(letter, letterCountArray);
    }
  }

  return letterCountArray;
}

function printLetterFrequency(
  frequencyMap: { letter: string; count: number }[]
) {
  console.log("Letter Frequency:");

  for (const item of frequencyMap) {
    console.log(`${item.letter}: ${item.count}`);
  }
}

function incrementLetterCount(item: { letter: string; count: number }) {
  item.count += 1;
}

function createLetterItem(
  letter: string,
  frequencyMap: { letter: string; count: number }[]
) {
  frequencyMap.push({ letter: letter, count: 1 });
}

const inputString =
  "Pero que diablura del diablo es que esta pasando aqui diablazo";
const frequencyMap = calculateLetterFrequency(inputString);
printLetterFrequency(frequencyMap);
