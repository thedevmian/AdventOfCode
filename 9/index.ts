const file = await Deno.readTextFile("./input.txt");
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
    // check if x is the same
    return Math.abs(point1[1] - point2[1]) > 1 ? true : false;
    // check if y is the same
  }
  if (point1[1] === point2[1]) {
    return Math.abs(point1[0] - point2[0]) > 1 ? true : false;
  }

  return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]) > 2
    ? true
    : false;
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
console.log(tailPoints);
const uniqueTailPoints = new Set(tailPoints.map((point) => point.join(",")));
console.log(uniqueTailPoints.size);
