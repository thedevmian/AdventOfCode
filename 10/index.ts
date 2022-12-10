const file = await Deno.readTextFile("input.txt");
const instructions = file.split("\n").map((line) => line.split(" "));

// console.log(instructions);
// During the 20th cycle, register X has the value 21, so the signal strength is 20 * 21 = 420. (The 20th cycle occurs in the middle of the second addx -1, so the value of register X is the starting value, 1, plus all of the other addx values up to that point: 1 + 15 - 11 + 6 - 3 + 5 - 1 - 8 + 13 + 4 = 21.)
// During the 60th cycle, register X has the value 19, so the signal strength is 60 * 19 = 1140.
// During the 100th cycle, register X has the value 18, so the signal strength is 100 * 18 = 1800.
// During the 140th cycle, register X has the value 21, so the signal strength is 140 * 21 = 2940.
// During the 180th cycle, register X has the value 16, so the signal strength is 180 * 16 = 2880.
// During the 220th cycle, register X has the value 18, so the signal strength is 220 * 18 = 3960.
// The sum of these signal strengths is 13140.

// At the start of the first cycle, the noop instruction begins execution. During the first cycle, X is 1. After the first cycle, the noop instruction finishes execution, doing nothing.
// At the start of the second cycle, the addx 3 instruction begins execution. During the second cycle, X is still 1.
// During the third cycle, X is still 1. After the third cycle, the addx 3 instruction finishes execution, setting X to 4.
// At the start of the fourth cycle, the addx -5 instruction begins execution. During the fourth cycle, X is still 4.
// During the fifth cycle, X is still 4. After the fifth cycle, the addx -5 instruction finishes execution, setting X to -1.

let cycleCount = 1;
let registerX = 1;
let result = [];
const cycles = [20, 60, 100, 140, 180, 220];

instructions.forEach((instruction) => {
  const [operation, value] = instruction;
  ++cycleCount;

  if (cycles.includes(cycleCount)) {
    result.push(cycleCount * registerX);
  }
  if (operation === "addx") {
    registerX += Number(value);
    ++cycleCount;

    if (cycles.includes(cycleCount)) {
      result.push(cycleCount * registerX);
    }
  }
});
// Part 1: 14160
// console.log(result.reduce((a, b) => a + b, 0));

// Part 2
const spriteCycles = [40, 80, 120, 160, 200, 240];
let currentCRT = 1;

const isVisible = (spritePosition: number, cycleCount: number) => {
  const newSpritePostions = [
    spritePosition,
    spritePosition + 1,
    spritePosition + 2,
  ];

  if (newSpritePostions.includes(cycleCount)) {
    return true;
  }
};

const printLine = (
  instructions: string[][],
  startingSpritePosition: number
) => {
  const list: string[] = [];
  let spritePostion = startingSpritePosition;
  instructions.forEach((instruction) => {
    const [operation, value] = instruction;

    if (isVisible(spritePostion, currentCRT)) {
      list.push("#");
    } else {
      list.push(".");
    }

    ++currentCRT;

    if (operation === "addx") {
      isVisible(spritePostion, currentCRT) ? list.push("#") : list.push(".");
      ++currentCRT;
      spritePostion += Number(value);
    }
  });
  return list;
};

for (let i = 1; i < spriteCycles[spriteCycles.length - 1]; i += 40) {
  const test = printLine(instructions, 201).slice(201 - 1, 201 + 40);
  console.log(test.join(""));
}
