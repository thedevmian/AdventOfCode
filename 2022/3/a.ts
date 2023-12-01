const text = await Deno.readTextFile("./input.txt");
const lines = text.split(/\r?\n/);

const letters = [];

const findOverlap = (compartment1: string, compartment2: string): string[] => {
  const char = [];
  for (let i = 0; i < compartment1.length; i++) {
    if (compartment2.includes(compartment1[i])) {
      char.push(compartment1[i]);
    }
  }
  return char;
};

for (let line of lines) {
  if (line.length % 2 === 0) {
    const half = line.length / 2;
    const equalElements = findOverlap(line.slice(0, half), line.slice(half));
    if (equalElements) {
      letters.push(equalElements[0]);
    }
  }
}

const prioritySum = (letters: string[]): number => {
  let sum = 0;

  for (let letter of letters) {
    const charCode = letter.charCodeAt(0);
    const priority = charCode >= 97 ? charCode - 96 : charCode - 38;
    sum += priority;
  }

  return sum;
};

/// --- Day 3: Rucksack ---
/// Part 1 ---
console.log("Sum of letters: ", prioritySum(letters));

/// ------------------------------
const t = performance.now();
console.log(`${t} ms since start!`);
