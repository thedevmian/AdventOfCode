const file = await Deno.readTextFile('./test.txt');


const parseInput = (input: string) => {
    const lines = file.split('\n');
    const numbers = lines.map((line) => line.split(' ').map((num) => parseInt(num)));
    let numbersArray: number[][] = [];
    const firstNumbersArray: number[] = [];

    const newArray = [];

    // numbers.forEach((number, index) => {
    //     const newArray = [];
    //     newArray.push(number);
    //     console.log(newArray);
    //     numbersArray.push(newArray);
    // }
    // );
    console.log(numbers);
}
parseInput(file);
// for (let i = 0; i < numbers.length; i++) {
//     // console.log(numbers[i]);

//     // we need to find the next number
//     // 10 13 16 21 30 45 
//     // 3 3 5 9 15
//     // 0 2 4 6
//     // 2 2 2
//     // 0 0

//     firstNumbersArray.push(numbers[i]);

//     if (i === numbers.length - 1) {
//         numbersArray.push(firstNumbersArray);
//         break;
//     }

// }

// console.log(numbersArray);