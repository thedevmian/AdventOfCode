const file = await Deno.readTextFile('./test.txt');
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
    // row.split('');
}
)


data.unshift(Array(data[0].length).fill('.'));
data.push(Array(data[0].length).fill('.'));

numbers.unshift(Array(numbers[0].length).fill(null));
numbers.push(Array(numbers[0].length).fill(null));


// console.log(data);
// Part 1

let sum: number = 0;

for (let i = 0; i < numbers.length; i++) {
    let startsAt = 0;
    for (let j = 0; j < numbers[i].length; j++) {
        let flag = false;
        if (numbers[i][j] === null) continue;

        // console.log(data[i].indexOf(numbers[i][j][0]));
        let currentNum = numbers[i][j];
        let firstColIndexNum = data[i].indexOf(currentNum[0], startsAt);
        let lastColIndexNum = firstColIndexNum + currentNum.length - 1;

        startsAt = lastColIndexNum + 1;

        // check if the surrounding numbers are dots
        // left
        // console.log(data[i][firstColIndexNum - 1]);
        // console.log(currentNum);



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

        if (!flag) {
            console.log(currentNum);
        }



    }

}


// //top 
// if (!(data[i - 1][firstColIndexNum] === '.')) {
//     flag = true;
// }

// // top left
// if (!(data[i - 1][firstColIndexNum - 1] === '.')) {
//     flag = true;
// }

// // bottom
// if (!(data[i + 1][firstColIndexNum] === '.')) {
//     flag = true;
// }

// // bottom left
// if (!(data[i + 1][firstColIndexNum - 1] === '.')) {
//     flag = true;
// }

// if (currentNum.length === 1) {
//     // right
//     if (!(data[i][lastColIndexNum + 1] === '.')) {
//         flag = true;
//     }

//     // top right
//     if (!(data[i - 1][lastColIndexNum + 1] === '.')) {
//         flag = true;
//     }

//     // bottom right
//     if (!(data[i + 1][lastColIndexNum + 1] === '.')) {
//         flag = true;
//     }
// }


// if (currentNum.length === 2) {
//     // top
//     if (!(data[i - 1][lastColIndexNum] === '.')) {
//         flag = true;
//     }
//     // bottom
//     if (!(data[i + 1][lastColIndexNum] === '.')) {
//         flag = true;
//     }
//     if (!(data[i][lastColIndexNum + 1] === '.')) {
//         flag = true;
//     }

//     // top right
//     if (!(data[i - 1][lastColIndexNum + 1] === '.')) {
//         flag = true;
//     }

//     // bottom right
//     if (!(data[i + 1][lastColIndexNum + 1] === '.')) {
//         flag = true;
//     }
// }

// if (currentNum.length === 3) {
//     // top
//     if (!(data[i - 1][firstColIndexNum + 1] === '.')) {
//         flag = true;
//     }
//     // bottom
//     if (!(data[i + 1][firstColIndexNum + 1] === '.')) {
//         flag = true;
//     }

//     // top
//     if (!(data[i - 1][lastColIndexNum] === '.')) {
//         flag = true;
//     }
//     // bottom
//     if (!(data[i + 1][lastColIndexNum] === '.')) {
//         flag = true;
//     }

//     // right
//     if (!(data[i][lastColIndexNum + 1] === '.')) {
//         flag = true;
//     }

//     // top right
//     if (!(data[i - 1][lastColIndexNum + 1] === '.')) {
//         flag = true;
//     }

//     // bottom right
//     if (!(data[i + 1][lastColIndexNum + 1] === '.')) {
//         flag = true;
//     }

// }

// if (flag) {

// } else {
//     console.log(currentNum);
// }



// } catch (error) {
//     // console.log(undefined);
// }
// // top left
// if (!data[firstRowIndexNum - 1][firstColIndexNum - 1] || data[firstRowIndexNum - 1][firstColIndexNum - 1] === '.') {
//     flag = false;
// } else {
//     flag = true;
// }

// // top
// if (!data[firstRowIndexNum - 1][firstColIndexNum] || data[firstRowIndexNum - 1][firstColIndexNum] === '.') {
//     flag = false;
// } else {
//     flag = true;
// }

// // bottom left
// if (!data[firstRowIndexNum + 1][firstColIndexNum - 1] || data[firstRowIndexNum + 1][firstColIndexNum - 1] === '.') {
//     flag = false;
// } else {
//     flag = true;
// }

// // bottom
// if (!data[firstRowIndexNum + 1][firstColIndexNum] || data[firstRowIndexNum + 1][firstColIndexNum] === '.') {
//     flag = false;
// } else {
//     flag = true;
// }




// if (data[firstRowIndexNum - 1][firstColIndexNum] === '.' || null) continue;
// if (data[firstRowIndexNum - 1][lastColIndexNum] === '.' || null) continue;






// }


// console.log(numbers[i]);
// console.log(data[i].indexOf(numbers[i][0][0]));

// console.log(i);
// console.log(data[i]); // row

// // console.log(numbers[i][0]); // number


// console.log(data[i].indexOf(numbers[i][0]));

// }
