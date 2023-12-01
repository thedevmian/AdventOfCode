const text = await Deno.readTextFile("./input.txt");

const stack1 = ["C", "Q", "B"];
const stack2 = ["Z", "W", "Q", "R"];
const stack3 = ["V", "L", "R", "M", "B"];
const stack4 = ["W", "T", "V", "H", "Z", "C"];
const stack5 = ["G", "V", "N", "B", "H", "Z", "D"];
const stack6 = ["Q", "V", "F", "J", "C", "P", "N", "H"];
const stack7 = ["S", "Z", "W", "R", "T", "G", "D"];
const stack8 = ["P", "Z", "W", "B", "N", "M", "G", "C"];
const stack9 = ["P", "F", "Q", "W", "M", "B", "J", "N"];

const stack = [
  stack1,
  stack2,
  stack3,
  stack4,
  stack5,
  stack6,
  stack7,
  stack8,
  stack9,
];

const lines = text.split(/\r?\n/);

const moveCrates = (qauntity: number, from: string[], to: string[]) => {
  for (let i = 0; i < qauntity; i++) {
    if (from.length === 0) {
      return;
    }
    to.unshift(from.shift());
  }
};

const moveCratesPart2 = (qauntity: number, from: string[], to: string[]) => {
  to.unshift(...from.slice(0, qauntity));
  from.splice(0, qauntity);
};

for (const line of lines) {
  const qauntity = Number(line.split(" ")[1]);
  const fromStack = Number(line.split(" ")[3]);
  const toStack = Number(line.split(" ")[5]);

  //   console.log(
  //     "Move " + qauntity + " crates from " + fromStack + " to " + toStack
  //   );

  // Part 1
  moveCrates(qauntity, stack[fromStack - 1], stack[toStack - 1]);

  // Part 2
  // moveCratesPart2(qauntity, stack[fromStack - 1], stack[toStack - 1]);
}

stack.forEach((s) => console.log(s[0]));

const t = performance.now();
console.log(`Time from start: ${t}ms`);
