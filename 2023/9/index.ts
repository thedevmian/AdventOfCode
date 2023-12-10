const file = await Deno.readTextFile('./input.txt');

const parseInput = (input: string) => {
    const lines = file.split('\n');
    const numbers = lines.map((line) => line.split(' ').map((num) => parseInt(num)));

    return numbers;
}

const findNextNumber = (numbers: number[]) => {
    let diffNumbers: number[] = [];

    for (let i = 0; i < numbers.length - 1; i++) {
        const diff = numbers[i + 1] - numbers[i];
        diffNumbers.push(diff);
    }

    const nextNumberSet = new Set(diffNumbers);

    // let lastFindNumbers: number[] = [];
    // lastFindNumbers.push(numbers[numbers.length - 1]) // Part 1

    // Part 2
    let firstFindNumber: number[] = [];
    firstFindNumber.push(numbers[0]);
    firstFindNumber.push(diffNumbers[0]);

    // lastFindNumbers.push(diffNumbers[diffNumbers.length - 1]);

    if (nextNumberSet.size === 1) {
        // console.log("Finded", firstFindNumber[0] - firstFindNumber[1]);
        // return lastFindNumbers[0] + lastFindNumbers[1];
        return firstFindNumber[0] - firstFindNumber[1];
    }

    while (nextNumberSet.size > 1) {
        let tempArray: number[] = [];

        // console.log("Diff numbers", diffNumbers);
        for (let j = 0; j < diffNumbers.length - 1; j++) {
            const diff = diffNumbers[j + 1] - diffNumbers[j];
            tempArray.push(diff);
        }

        let tempSet = new Set(tempArray);
        if (tempSet.size > 1) {
            firstFindNumber.push(tempArray[0]);
            diffNumbers = tempArray;
            console.log(diffNumbers);
            // console.log("Last finded", firstFindNumber);
            // console.log("firstFindNumber", firstFindNumber);
        } else {
            // finded
            const findValue = tempSet.values().next().value;
            // console.log("Finded", findValue);
            firstFindNumber.push(findValue);
            console.log("firstFindNumber", firstFindNumber);
            break
        }
    }

    // for (let i = lastFindNumbers.length - 1; i >= 0; i--) {
    //     if (i === 0) {
    //         return lastFindNumbers[i];
    //     }
    //     lastFindNumbers[i - 1] += lastFindNumbers[i];
    // }
    // console.log(lastFindNumbers[0]);
    // return lastFindNumbers[0];

    // Part 2
    console.log("firstFindNumber", firstFindNumber);
    for (let i = firstFindNumber.length - 1; i >= 0; i--) {
        if (i === 0) {
            return firstFindNumber[i];
        }
        firstFindNumber[i - 1] -= firstFindNumber[i];
    }

}

const numbers = parseInput(file);
let result = 0;

for (let i = 0; i < numbers.length; i++) {
    result += findNextNumber(numbers[i]);
}

console.log("Part 1: ", result);