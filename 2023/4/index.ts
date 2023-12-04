const file = await Deno.readTextFile("./data.txt");
const dataLines = file.split("\n");


const data = dataLines.map((row) => {
    const [gameInfo, cardNumbers] = row.trim().split(':');
    const winningNumbers = cardNumbers.split("|")[0].match(/(\d+)/g);
    const numbers = cardNumbers.split("|")[1].match(/(\d+)/g);


    return {
        winningNumbers,
        numbers,
        gameInfo
    }
});


// Part 1
let points = 0;
for (const row of data) {
    const { gameInfo, winningNumbers, numbers } = row;

    const winningNumbersSet = new Set(winningNumbers);
    const numbersSet = new Set(numbers);
    const intersection = new Set([...winningNumbersSet].filter(x => numbersSet.has(x)));

    let cardValue = 0
    if (intersection.size > 0) cardValue = Math.pow(2, intersection.size - 1);
    points += cardValue;

}
console.log(points);


// Part 2
let totalScratchCards = 0;
let scratchCards: [string, number, number][] = [];
for (let i = 0; i < data.length; i++) {
    const { gameInfo, winningNumbers, numbers } = data[i];
    const gameNumber = gameInfo.split(" ")[1];

    const winningNumbersSet = new Set(winningNumbers);
    const numbersSet = new Set(numbers);
    const intersection = new Set([...winningNumbersSet].filter(x => numbersSet.has(x)));

    let instances = 1;
    scratchCards.push([gameNumber, intersection.size, instances]);
}


for (let i = 0; i < scratchCards.length; i++) {
    let [gameNumber, intersectionSize, instances] = scratchCards[i];

    if (intersectionSize > 0) {
        for (let j = 0; j < intersectionSize; j++) {
            const newInstances = instances + scratchCards[i + j + 1][2];
            let newScratchCards = [...scratchCards[i + j + 1].slice(0, 2), newInstances];
            scratchCards = [...scratchCards.slice(0, i + j + 1), newScratchCards, ...scratchCards.slice(i + j + 2)];
        }
    }

}

for (const [gameNumber, intersectionSize, instances] of scratchCards) {
    totalScratchCards += instances;

}
console.log(totalScratchCards);
