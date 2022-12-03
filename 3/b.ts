const text = await Deno.readTextFile("./input.txt");
const lines = text.split(/\r?\n/);

const groups: [string, string, string][] = [];

const groupElfs = (lines: string[]) => {
  for (let i = 0; i < lines.length; i += 3) {
    groups.push([lines[i], lines[i + 1], lines[i + 2]]);
  }
};

const findOverlap = (groups: [string, string, string][]): string[] => {
  const letters: string[] = [];

  groups.forEach((group) => {
    const foundLetters = new Set<string>();
    const firstItem = group[0];
    firstItem.split("").forEach((letter) => {
      if (group[1].includes(letter) && group[2].includes(letter)) {
        foundLetters.add(letter);
      }
    });
    letters.push(...foundLetters);
  });

  return letters;
};
const sumOfLetters = (letters: string[]): number => {
  let sum = 0;

  for (let letter of letters) {
    const charCode = letter.charCodeAt(0);
    const priority = charCode >= 97 ? charCode - 96 : charCode - 38;
    sum += priority;
  }

  return sum;
};

groupElfs(lines);
console.log("Sum of letters: ", sumOfLetters(findOverlap(groups)));

const t = performance.now();
console.log(`${t} ms since start!`);
