const input = await Deno.readTextFile("./input.txt");
const data = input.split("\n").map((line) => line.split(""));

const trees = data.map((t) => t.map((x) => parseInt(x)));

const directions = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
] as const;

let visibleTrees = 0;

for (const i in trees) {
  for (const j in trees[i]) {
    loop: for (const [x, y] of directions) {
      let x1 = +i + x;
      let y1 = +j + y;
      while (x1 >= 0 && x1 < trees[i].length && y1 >= 0 && y1 < trees.length) {
        if (trees[i][j] <= trees[x1][y1]) {
          continue loop;
        }
        x1 += x;
        y1 += y;
      }
      visibleTrees++;
      break;
    }
  }
}
// Part 1
console.log(visibleTrees);

// Part 2
let max = -1;

for (const i in trees) {
  for (const j in trees[i]) {
    let count = 1;
    for (const [x, y] of directions) {
      let x1 = +i + x;
      let y1 = +j + y;
      let directionCount = 0;
      while (x1 >= 0 && x1 < trees[i].length && y1 >= 0 && y1 < trees.length) {
        directionCount++;
        if (trees[i][j] <= trees[x1][y1]) {
          break;
        }
        x1 += x;
        y1 += y;
      }
      count *= directionCount;
    }
    max = Math.max(max, count);
  }
}
console.log(max);
