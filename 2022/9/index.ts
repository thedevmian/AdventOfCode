const file = await Deno.readTextFile("./test.txt");
const instructions = file.split("\n").map((line) => line.split(" "));

const startingPoint = [0, 0];
let currentPoint = startingPoint;
let currTailPoint = startingPoint;
let headPoints: number[][] = [startingPoint];
let tailPoints: number[][] = [startingPoint];

type Directions = "R" | "U" | "L" | "D";
const directions: Directions[] = ["R", "U", "L", "D"];

const isHeadAway = (point1: number[], point2: number[]): boolean => {
  if (point1[0] === point2[0]) {
    return Math.abs(point1[1] - point2[1]) > 1;
  }
  if (point1[1] === point2[1]) {
    return Math.abs(point1[0] - point2[0]) > 1;
  }
  return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]) > 2;
};

const moveToDirection = (direction: Directions, point: number[]): number[] => {
  switch (direction) {
    case "R":
      return [point[0] + 1, point[1]];
    case "U":
      return [point[0], point[1] + 1];
    case "L":
      return [point[0] - 1, point[1]];
    case "D":
      return [point[0], point[1] - 1];
  }
};

for (const instruction of instructions) {
  const [direction, steps] = instruction;

  for (let i = 1; i <= steps; i++) {
    currentPoint = moveToDirection(direction as Directions, currentPoint);
    headPoints.push(currentPoint);
    if (isHeadAway(currentPoint, currTailPoint)) {
      // tail movement
      // right
      if (currentPoint[0] > currTailPoint[0]) {
        currTailPoint = moveToDirection("R", currTailPoint);
      }
      // left
      if (currentPoint[0] < currTailPoint[0]) {
        currTailPoint = moveToDirection("L", currTailPoint);
      }
      // up
      if (currentPoint[1] > currTailPoint[1]) {
        currTailPoint = moveToDirection("U", currTailPoint);
      }
      // down
      if (currentPoint[1] < currTailPoint[1]) {
        currTailPoint = moveToDirection("D", currTailPoint);
      }
      tailPoints.push(currTailPoint);
    }
  }
}

// Part 1
// console.log(tailPoints);
const uniqueTailPoints = new Set(tailPoints.map((point) => point.join(",")));
console.log(uniqueTailPoints.size);

// Part 2
const initialKnots = (length: number): number[][] => {
  const knots: number[][] = [];
  for (let i = 0; i < length; i++) {
    knots.push([0, 0]);
  }
  return knots;
};

const checkIfKnotsAreClose = (
  currKnot: number[],
  prevKnot: number[]
): number[] => {
  if (currKnot !== undefined && prevKnot !== undefined) {
    if (isHeadAway(currKnot, currTailPoint)) {
      if (currKnot[0] > currTailPoint[0]) {
        currTailPoint = moveToDirection("R", currTailPoint);
      }
      if (currKnot[0] < currTailPoint[0]) {
        currTailPoint = moveToDirection("L", currTailPoint);
      }
      if (currKnot[1] > currTailPoint[1]) {
        currTailPoint = moveToDirection("U", currTailPoint);
      }
      if (currKnot[1] < currTailPoint[1]) {
        currTailPoint = moveToDirection("D", currTailPoint);
      }
      return currTailPoint;
    }
  }
};

const updateTailVisited = (
  currVisited: number[][],
  tailCoords: number[]
): number[][] => {
  let newVisited: number[][] = currVisited;
  let isVisited: boolean = false;
  newVisited.forEach((points: number[]) => {
    if (points[0] === tailCoords[0] && points[1] === tailCoords[1]) {
      isVisited = true;
    }
  });
  if (!isVisited) {
    newVisited.push(tailCoords);
  }
  return newVisited;
};

const knotsRope = initialKnots(10);
let tailVisited: number[][] = [[0, 0]];
for (const instruction of instructions) {
  const [direction, steps] = instruction;

  for (let i = 1; i <= steps; i++) {
    knotsRope[0] = moveToDirection(direction as Directions, knotsRope[0]);
    for (let j = 1; j < knotsRope.length; j++) {
      let newKnot = knotsRope[j];
      let prevKnot = knotsRope[j - 1];

      knotsRope[j] = checkIfKnotsAreClose(newKnot, prevKnot);
      if (j === knotsRope.length - 1) {
        tailVisited = updateTailVisited(tailVisited, knotsRope[j]);
      }
    }
  }
}

console.log(tailVisited.length);
