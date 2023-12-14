// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90 - degree bend connecting north and east.
// J is a 90 - degree bend connecting north and west.
// 7 is a 90 - degree bend connecting south and west.
// F is a 90 - degree bend connecting south and east.
// .is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

const file = await Deno.readTextFile("./input.txt");

let data = file.split("\n").map((row) => row.split(""));

const findSPos = (data: string[][]) => {
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        for (let j = 0; j < row.length; j++) {
            const col = row[j];
            if (col === "S") return [i, j];
        }
    }
};

const positionS = findSPos(data);


type NorthPipe = "7" | "|" | "F";
type EastPipe = "J" | "-" | "7";
type SouthPipe = "L" | "|" | "J";
type WestPipe = "F" | "-" | "L";


type Pipe = NorthPipe | EastPipe | SouthPipe | WestPipe;

type Position = [number, number];


const northVariants: NorthPipe[] = ["7", "|", "F"];
const eastVariants: EastPipe[] = ["J", "-", "7"];
const southVariants: SouthPipe[] = ["L", "|", "J"];
const westVariants: WestPipe[] = ["F", "-", "L"];

const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};


let previousPos: Position = positionS as Position;
let currentPos = [previousPos[0], previousPos[1] - 1] as Position;
data[previousPos[0]][previousPos[1]] = "J";

const prevs: Position[] = [];
prevs.push(previousPos);

console.log('Position S', positionS);

while (compareArrays(currentPos, positionS) === false) {

    const sign = data[currentPos[0]][currentPos[1]];
    let nextSign: string;
    let nextSign2: string;
    let nextPos: Position;
    let nextPos2: Position;

    switch (sign) {
        case "L":
            nextPos = [currentPos[0] - 1, currentPos[1]] as Position; // |
            nextPos2 = [currentPos[0], currentPos[1] + 1] as Position; // J
            nextSign = data[nextPos[0]][nextPos[1]];
            nextSign2 = data[nextPos2[0]][nextPos2[1]];

            if (northVariants.includes(nextSign as NorthPipe) && eastVariants.includes(nextSign2 as EastPipe)) {
                if (compareArrays(prevs[prevs.length - 1], nextPos2)) {
                    prevs.push(currentPos);
                    currentPos = nextPos;
                } else if (compareArrays(prevs[prevs.length - 1], nextPos)) {
                    prevs.push(currentPos);
                    currentPos = nextPos2;
                }
            }
            break;
        case "J":
            nextPos = [currentPos[0] - 1, currentPos[1]] as Position; // |
            nextPos2 = [currentPos[0], currentPos[1] - 1] as Position; // J
            nextSign = data[nextPos[0]][nextPos[1]];
            nextSign2 = data[nextPos2[0]][nextPos2[1]];

            if (northVariants.includes(nextSign as NorthPipe) && westVariants.includes(nextSign2 as WestPipe)) {
                if (compareArrays(prevs[prevs.length - 1], nextPos2)) {
                    prevs.push(currentPos);
                    currentPos = nextPos;
                } else if (compareArrays(prevs[prevs.length - 1], nextPos)) {

                    prevs.push(currentPos);
                    currentPos = nextPos2;
                }
            }
            break;
        case "F":
            nextPos = [currentPos[0] + 1, currentPos[1]] as Position; // |
            nextPos2 = [currentPos[0], currentPos[1] + 1] as Position; // J
            nextSign = data[nextPos[0]][nextPos[1]];
            nextSign2 = data[nextPos2[0]][nextPos2[1]];

            if (southVariants.includes(nextSign as SouthPipe) && eastVariants.includes(nextSign2 as EastPipe)) {
                if (compareArrays(prevs[prevs.length - 1], nextPos2)) {
                    prevs.push(currentPos);
                    currentPos = nextPos;
                } else if (compareArrays(prevs[prevs.length - 1], nextPos)) {

                    prevs.push(currentPos);
                    currentPos = nextPos2;
                }


            }
            break;
        case "7":
            nextPos = [currentPos[0] + 1, currentPos[1]] as Position; // |
            nextPos2 = [currentPos[0], currentPos[1] - 1] as Position; // J
            nextSign = data[nextPos[0]][nextPos[1]];
            nextSign2 = data[nextPos2[0]][nextPos2[1]];

            if (southVariants.includes(nextSign as SouthPipe) && westVariants.includes(nextSign2 as WestPipe)) {
                if (compareArrays(prevs[prevs.length - 1], nextPos2)) {
                    prevs.push(currentPos);
                    currentPos = nextPos;
                } else if (compareArrays(prevs[prevs.length - 1], nextPos)) {

                    prevs.push(currentPos);
                    currentPos = nextPos2;
                }

            }
            break;
        case "|":
            nextPos = [currentPos[0] - 1, currentPos[1]] as Position; // |
            nextPos2 = [currentPos[0] + 1, currentPos[1]] as Position; // J
            nextSign = data[nextPos[0]][nextPos[1]];
            nextSign2 = data[nextPos2[0]][nextPos2[1]];

            if (northVariants.includes(nextSign as NorthPipe) && southVariants.includes(nextSign2 as SouthPipe)) {
                if (compareArrays(prevs[prevs.length - 1], nextPos2)) {
                    prevs.push(currentPos);
                    currentPos = nextPos;
                } else if (compareArrays(prevs[prevs.length - 1], nextPos)) {

                    prevs.push(currentPos);
                    currentPos = nextPos2;
                }

            }
            break;
        case "-":
            nextPos = [currentPos[0], currentPos[1] + 1] as Position; // |
            nextPos2 = [currentPos[0], currentPos[1] - 1] as Position; // J
            nextSign = data[nextPos[0]][nextPos[1]];
            nextSign2 = data[nextPos2[0]][nextPos2[1]];

            if (eastVariants.includes(nextSign as EastPipe) && westVariants.includes(nextSign2 as WestPipe)) {
                if (compareArrays(prevs[prevs.length - 1], nextPos2)) {
                    prevs.push(currentPos);
                    currentPos = nextPos;
                } else if (compareArrays(prevs[prevs.length - 1], nextPos)) {

                    prevs.push(currentPos);
                    currentPos = nextPos2;
                }

            }
            break;
        default:
            break;
    }

}

// Part 1
console.log(prevs.length / 2)
console.log(prevs);



let x = 0;
for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (let j = 0; j < row.length; j++) {
        const col = row[j];
        // console.log([i, j]);
        if (prevs.findIndex((pos) => pos[0] === i && pos[1] === j) == -1) {
            data[i][j] = ".";
        }
    }
}

const outside = new Set();
function assert(condition) {
    if (!condition) {
        // throw new Error("Assertion failed");
    }
}


for (let r = 0; r < data.length; r++) {
    let within = false;
    let up = null;

    for (let c = 0; c < data[r].length; c++) {
        const ch = data[r][c];

        if (ch === "|") {
            assert(up === null);
            within = !within;
        } else if (ch === "-") {
            assert(up !== null);
        } else if (ch === "L" || ch === "F") {
            assert(up === null);
            up = ch === "L";
        } else if (ch === "7" || ch === "J") {
            assert(up !== null);
            if (ch !== (up ? "J" : "7")) {
                within = !within;
            }
            up = null;
        } else if (ch === ".") {
            // do nothing
        } else {
            // throw new Error(`Unexpected character (horizontal): ${ch}`);
        }

        if (!within) {
            outside.add([r, c]);
        }
    }
}

outside.forEach((pos) => {
    data[pos[0]][pos[1]] = " ";
}
);

prevs.forEach((pos) => {
    data[pos[0]][pos[1]] = " ";
});




const countInsideDots = (data: string[][], result) => {
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        for (let j = 0; j < row.length; j++) {
            const col = row[j];
            if (col === ".") result++;
        }
    }
    return result;
};


console.log(countInsideDots(data, 0));
await Deno.writeTextFile("./output2.txt", data.map((row) => row.join("")).join("\n"));
