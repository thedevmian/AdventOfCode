const file = await Deno.readTextFile("demo.txt");

/*
When you were still back at the camp, you overheard some Elves talking about coordinate file encryption. The main operation involved in decrypting the file is called mixing.
The encrypted file is a list of numbers. To mix the file, move each number forward or backward in the file a number of positions equal to the value of the number being moved. The list is circular, so moving a number off one end of the list wraps back around to the other end as if the ends were connected.
For example, to move the 1 in a sequence like 4, 5, 6, 1, 7, 8, 9, the 1 moves one position forward: 4, 5, 6, 7, 1, 8, 9. To move the -2 in a sequence like 4, -2, 5, 6, 7, 8, 9, the -2 moves two positions backward, wrapping around: 4, 5, 6, 7, 8, -2, 9.
The numbers should be moved in the order they originally appear in the encrypted file. Numbers moving around during the mixing process do not change the order in which the numbers are moved.


Consider this encrypted file:

1
2
-3
3
-2
0
4

Mixing this file proceeds as follows:

Initial arrangement:
1, 2, -3, 3, -2, 0, 4

1 moves between 2 and -3:
2, 1, -3, 3, -2, 0, 4

2 moves between -3 and 3:
1, -3, 2, 3, -2, 0, 4

-3 moves between -2 and 0:
1, 2, 3, -2, -3, 0, 4

3 moves between 0 and 4:
1, 2, -2, -3, 0, 3, 4

-2 moves between 4 and 1:
1, 2, -3, 0, 3, 4, -2

0 does not move:
1, 2, -3, 0, 3, 4, -2

4 moves between -3 and 0:
1, 2, -3, 4, 0, 3, -2


Then, the grove coordinates can be found by looking at the 1000th, 2000th, and 3000th numbers after the value 0, wrapping around the list as necessary.
In the above example,

the 1000th number after 0 is 4, 
the 2000th is -3, 
and the 3000th is 2; 

adding these together produces 3.

*/

const sequence = file.split("\n").map(Number);
// let dataCloned = [...sequence];
// const dataWithIndex = sequence.map((val, index) => ({ val, index }));

// const normalizeMoveToIndex = (moveToIndex, maxSize) => {
//   if (Math.abs(moveToIndex) / maxSize >= 1) {
//     const remainder = moveToIndex % maxSize;

//     return remainder;
//   }

//   return moveToIndex;
// };

// for (let i = 0; i < sequence.length; i++) {
//   const leftPart = [...dataCloned.slice(0, dataWithIndex[i].index)];
//   const rightPart = [...dataCloned.slice(dataWithIndex[i].index + 1)];
//   const elementToMove = dataWithIndex[i];

//   let moveToIndex = elementToMove.val + elementToMove.index;

//   moveToIndex = normalizeMoveToIndex(moveToIndex, dataWithIndex.length);

//   if (moveToIndex === elementToMove.index) {
//     continue;
//   }

//   if (moveToIndex <= 0) {
//     moveToIndex =
//       dataWithIndex.length + (moveToIndex % dataWithIndex.length) - 1;
//   } else if (moveToIndex >= dataWithIndex.length) {
//     moveToIndex = -(moveToIndex - (moveToIndex % dataWithIndex.length));
//   }

//   let newLeftPart = [];
//   let newRightPart = [];

//   if (moveToIndex > elementToMove.index) {
//     newLeftPart = [
//       ...leftPart,
//       ...rightPart.slice(0, moveToIndex - elementToMove.index),
//     ];
//     newRightPart = [...rightPart].slice(moveToIndex - elementToMove.index);
//   } else {
//     newLeftPart = [...leftPart.slice(0, moveToIndex + 1)];
//     newRightPart = [...leftPart.slice(moveToIndex + 1), ...rightPart];
//   }

//   const newArray = [...newLeftPart, elementToMove.val, ...newRightPart];

//   dataCloned = newArray;

//   if (moveToIndex > dataWithIndex[i].index) {
//     dataWithIndex
//       .filter(
//         (x) => x.index >= dataWithIndex[i].index && x.index <= moveToIndex
//       )
//       .forEach((x) => x.index--);
//   } else {
//     dataWithIndex
//       .filter(
//         (x) => x.index <= dataWithIndex[i].index && x.index >= moveToIndex
//       )
//       .forEach((x) => x.index++);
//   }

//   dataWithIndex[i].index = moveToIndex;
// }

// const zerothElementIndex = dataCloned.indexOf(0);

// console.log("zerothElementIndex", zerothElementIndex);

// const elementAtPosition = (startIndex, position, data) => {
//   if (startIndex + position > data.length) {
//     position = (startIndex + position) % data.length;
//   }

//   return data[position];
// };

// const firstElement = elementAtPosition(zerothElementIndex, 1000, dataCloned);
// const secondElement = elementAtPosition(zerothElementIndex, 2000, dataCloned);
// const thirdElement = elementAtPosition(zerothElementIndex, 3000, dataCloned);

// console.log("1000th element", firstElement);
// console.log("2000th element", secondElement);
// console.log("3000th element", thirdElement);

// console.log(firstElement + secondElement + thirdElement);
// const dataWithIndex = sequence.map((val, index) => ({ val, index }));

// console.log(dataWithIndex);

class CircularArray<T> {
  private array: T[];
  private iterateArray: T[] = [];
  private index: number;

  constructor(array: T[]) {
    this.array = array;
    this.iterateArray = [];
    this.index = 0;
  }

  get all() {
    return this.array;
  }

  get currentIterate() {
    return this.iterateArray;
  }

  set provideNewIterate(array: T[]) {
    this.iterateArray = [...array];
  }
  set currentArray(array: T[]) {
    this.array = array;
  }

  moveForwardBy(value: number) {
    const index = this.array.indexOf(value);
    this.index = index;

    for (let i = 0; i < value; i++) {
      if (this.index === 0 && value - i > 0) {
        this.moveOneStepForward();
      }

      this.moveOneStepForward();
    }

    return this.array;
  }

  moveBackwardBy(value: number) {
    const index = this.array.indexOf(value);

    this.index = index;

    for (let i = 0; i <= -1 * value; i++) {
      // if (this.index === 0) {
      //   i++;
      // }

      this.moveOneStepBackward();
    }

    return this.array;
  }

  moveOneStepForward() {
    if (this.index === this.array.length - 1) {
      this.array.unshift(this.array.pop());
    } else {
      this.array.splice(
        this.index,
        2,
        this.array[this.index + 1],
        this.array[this.index]
      );
    }

    this.index = (this.index + 1) % this.array.length;
  }

  moveOneStepBackward() {
    if (this.index === 0) {
      this.array.push(this.array.shift());
    } else {
      this.array.splice(
        this.index - 1,
        2,
        this.array[this.index],
        this.array[this.index - 1]
      );
    }

    this.index = (this.index - 1 + this.array.length) % this.array.length;
  }

  // changeIndexBy(value: number) {
  //   if (value > 0) {
  //     console.log("value", value);
  //     this.array
  //   } else {
  //     this.index = (this.index + value + this.array.length) % this.array.length;
  //   }
  // }
  get isDuplicate() {
    const set = new Set(this.array);
    return set.size !== this.array.length;
  }
}

const loop = () => {
  const circularArray = new CircularArray(sequence);

  circularArray.provideNewIterate = circularArray.all;
  const tempArray = circularArray.currentIterate;
  // console.log(circularArray.isDuplicate);

  tempArray.forEach((value, i) => {
    // console.log("value", value);
    if (value > 0) {
      circularArray.moveForwardBy(value);
      // console.log("forward", circularArray.all);
    } else if (value < 0) {
      circularArray.moveBackwardBy(value);
      // console.log("back", circularArray.all);
    }
  });
  //   circularArray.changeIndexBy(value);
  // });
  // console.log(circularArray.all);
  return circularArray.all;
};

let result;

for (let i = 1; i <= 3000; i++) {
  result = loop();
  // console.log(i);
  if (i === 1000 || i === 2000 || i === 3000) {
    console.log(result);
  }
  // console.log(i);
}

// console.log(loop());
// 1, 2, -3, 4, 0, 3, -2

// 1
// 2, 1, -3, 4, 0, 3, -2

// 2
// 1, -3, 2, 4, 0, 3, -2

// -3, 1, 2, 4, 0, 3, -2
// 1, 2, 4, 0, 3, -2, -3
// 1, 2, 4, 0, 3, -3, -2
// 1, 2, 4, 0, -3, 3, -2
// -3
// 1, 2, 4, 0, -3, 3, -2

// 4
// 1, 2, 0, -3, 3, -2, 4

// 0
// 1, 2, 0, -3, 3, -2, 4

// 3
// 1, 3, 2, 0, -3, -2, 4

// -2
// 1, 3, 2,-2, 0, -3, 4
