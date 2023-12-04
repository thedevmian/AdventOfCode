const file = await Deno.readTextFile('./data.txt');
const dataStream = file.split('\n');


const numbers = dataStream.map((row) => {
    const rowNumber = row.replace(/([^0-9])+/g, ' ').trim().split(' ').map((num) => {
        if (num === '') return null;
        const splitNum = num.split('');
        const numArr = [];
        for (const num of splitNum) {
            numArr.push(num);
        }
        return numArr;

    }
    );
    return rowNumber;
})

const data = dataStream.map((row) => {
    const addDot = "." + row + ".";
    return addDot.split('');
}
)

data.unshift(Array(data[0].length).fill('.'));
data.push(Array(data[0].length).fill('.'));
numbers.unshift(Array(numbers[0].length).fill(null));
numbers.push(Array(numbers[0].length).fill(null));


// Part 1
let sum: number = 0;

for (let i = 0; i < numbers.length; i++) {
    let startsAt = 0;
    for (let j = 0; j < numbers[i].length; j++) {
        let flag = false;
        if (numbers[i][j] === null) continue;

        let currentNum = numbers[i][j];
        let firstColIndexNum = data[i].indexOf(currentNum[0], startsAt);
        let lastColIndexNum = firstColIndexNum + currentNum.length - 1;

        startsAt = lastColIndexNum + 1;

        // check if the surrounding numbers are dots
        // left
        if ((String(data[i][firstColIndexNum - 1]) !== '.')) {
            flag = true;
        }

        // top
        if ((String(data[i - 1][firstColIndexNum]) !== '.')) {
            flag = true;
        }

        // // top left
        if ((String(data[i - 1][firstColIndexNum - 1]) !== '.')) {
            flag = true;
        }

        // bottom
        if ((String(data[i + 1][firstColIndexNum]) !== '.')) {
            flag = true;
        }

        // // bottom left
        if ((String(data[i + 1][firstColIndexNum - 1]) !== '.')) {
            flag = true;
        }

        if (currentNum.length < 3) {
            // right
            if ((String(data[i][lastColIndexNum + 1]) !== '.')) {
                flag = true;
            }

            // top right
            if ((String(data[i - 1][lastColIndexNum + 1]) !== '.')) {
                flag = true;
            }

            // bottom right
            if ((String(data[i + 1][lastColIndexNum + 1]) !== '.')) {
                flag = true;
            }
        }

        if (currentNum.length === 2) {
            // top
            if ((String(data[i - 1][lastColIndexNum]) !== '.')) {
                flag = true;
            }
            // bottom
            if ((String(data[i + 1][lastColIndexNum]) !== '.')) {
                flag = true;
            }
        }

        if (currentNum.length === 3) {
            // top second
            if ((String(data[i - 1][firstColIndexNum + 1]) !== '.')) {
                flag = true;
            }
            // bottom second
            if ((String(data[i + 1][firstColIndexNum + 1]) !== '.')) {
                flag = true;
            }

            // top
            if ((String(data[i - 1][lastColIndexNum]) !== '.')) {
                flag = true;
            }
            // bottom
            if ((String(data[i + 1][lastColIndexNum]) !== '.')) {
                flag = true;
            }

            // right
            if ((String(data[i][lastColIndexNum + 1]) !== '.')) {
                flag = true;
            }

            // top right
            if ((String(data[i - 1][lastColIndexNum + 1]) !== '.')) {
                flag = true;
            }

            // bottom right
            if ((String(data[i + 1][lastColIndexNum + 1]) !== '.')) {
                flag = true;
            }
        }

        if (flag) {
            const num = parseInt(currentNum.join(''));
            sum += num;
        }
    }
}

console.log(sum);

// Part 2
let gearRatioResult = 0;
const findRestOfTheNumber = (i: number, j: number, direction: "left" | "right") => {
    const num = [data[i][j]];
    if (direction === "left") {
        for (let k = j - 1; k >= 0; k--) {
            if (isNaN(data[i][k])) {
                break;
            }
            num.unshift(data[i][k]);
        }
    } else {
        for (let k = j + 1; k < data[i].length; k++) {
            if (isNaN(data[i][k])) {
                break;
            }
            num.push(data[i][k]);
        }
    }
    return num;
}

const getRestOfTheNumber = (i: number, j: number) => {
    const num = [data[i][j]];
    // check right
    for (let k = j + 1; k < data[i].length; k++) {
        if (isNaN(data[i][k])) {
            break;
        }
        num.push(data[i][k]);
    }

    // check left
    for (let k = j - 1; k >= 0; k--) {
        if (isNaN(data[i][k])) {
            break;
        }
        num.unshift(data[i][k]);
    }

    return num;
}

for (let i = 0; i < data.length; i++) {

    for (let j = 0; j < data[i].length; j++) {
        let gearRatio = 0;
        let testArray: number[] = [];
        let number;
        if (data[i][j] === '*') {
            // check the surrounding 
            // left
            if (!isNaN(data[i][j - 1])) {
                number = findRestOfTheNumber(i, j - 1, "left")
                testArray.push(Number(number.join('')));
            }

            // right 
            if (!isNaN(data[i][j + 1])) {
                number = findRestOfTheNumber(i, j + 1, "right")
                testArray.push(Number(number.join('')));
            }


            // top left
            if (!isNaN(data[i - 1][j - 1])) {
                number = getRestOfTheNumber(i - 1, j - 1);
                testArray.push(Number(number.join('')));
            }

            // top right
            if (!isNaN(data[i - 1][j + 1])) {
                number = getRestOfTheNumber(i - 1, j + 1);
                testArray.push(Number(number.join('')));
            }

            // bottom left
            if (!isNaN(data[i + 1][j - 1])) {
                number = getRestOfTheNumber(i + 1, j - 1);
                testArray.push(Number(number.join('')));
            }

            // bottom right
            if (!isNaN(data[i + 1][j + 1])) {
                number = getRestOfTheNumber(i + 1, j + 1);
                testArray.push(Number(number.join('')));
            }

            // top
            if (!isNaN(data[i - 1][j])) {
                // check if three numbers are on left or right
                number = getRestOfTheNumber(i - 1, j);
                testArray.push(Number(number.join('')));
            }

            // bottom
            if (!isNaN(data[i + 1][j])) {
                // check if three numbers are on left or right
                console.log()
                number = getRestOfTheNumber(i + 1, j);
                testArray.push(Number(number.join('')));
            }


            // delete duplicates
            testArray = [...new Set(testArray)];

            if (testArray.length == 2) {
                gearRatio = testArray[0] * testArray[1];
                console.log(testArray);
                console.log(gearRatio);
            }


            gearRatioResult += gearRatio;
            // find two numbers


        }
    }
}

console.log(gearRatioResult);