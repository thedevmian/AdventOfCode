const file = await Deno.readTextFile('./data.txt');
const dataStream = file.split('\n');

let result = 0;

const stringNumbers = new Map<string, number>([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
]);


const reverseString = (str: string) => {
    return str.split("").reverse().join("");
}

for (let i = 0; i < dataStream.length; i++) {
    let firstNumber = '';
    let lastNumber = '';
    let tempLine = dataStream[i];
    let tempWord = '';
    let j = 0;

    // find first number
    do {
        tempWord = tempLine.slice(0, j + 1);
        [...stringNumbers.keys()].some((value, key) => {
            if (tempWord.includes((key + 1).toString()) || tempWord.includes(value.toString())) {
                firstNumber = (key + 1).toString();
                return true;
            }
            return false;
        }
        );
        j++;
    } while (firstNumber === '' && j <= tempLine.length);


    // find last number
    const tempLineReverse = reverseString(tempLine);
    j = 0;
    do {
        tempWord = tempLineReverse.slice(0, j + 1);
        [...stringNumbers.keys()].some((value, key) => {
            if (tempWord.includes((key + 1).toString()) || tempWord.includes(reverseString(value.toString()))) {
                lastNumber = (key + 1).toString();
                return true;
            }
            return false;
        }
        );
        j++;
    } while (lastNumber === '' && j <= tempLineReverse.length);


    result += Number(firstNumber + lastNumber);

    // stringNumbers.forEach((value, key) => {
    //     if (tempWord.includes(key) || tempWord.includes(value.toString())) {
    //         firstNumber = value.toString() || key;

    //     }
    //     continue;
    // });

}

// for (let j = 0; j < tempLine.length; j++) {
//     stringNumbers.forEach((value, key) => {
//         if (tempLine.includes(key) || tempLine.includes(value.toString())) {
//             firstNumber = value.toString();
//         }
//     });
// }


// const tempNumArray = dataStream[i].replace(/([a-z\r])/g, '').split('');

// if (tempNumArray.length === 0) {
//     continue;
// } else if (tempNumArray.length === 1) {
//     result += Number(tempNumArray[0] + tempNumArray[0]);
// } else if (tempNumArray.length === 2) {
//     result += Number(tempNumArray[0] + tempNumArray[1]);
// } else {
//     result += Number(tempNumArray[0] + tempNumArray[tempNumArray.length - 1]);
// }

console.log(result);