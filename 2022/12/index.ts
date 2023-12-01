const file = await Deno.readTextFile("input.txt");

type Cordinates = [number, number];

interface Output {
  start: Cordinates;
  end: Cordinates;
  path: number[][];
}

const parseInput = (input: string): Output => {
  const startPostions: Cordinates[] = [];
  const endPostions: Cordinates[] = [];
  const lines = input.split("\n");

  const path = lines.map((line, rowIndex) =>
    line.split("").map((char, colIndex) => {
      if (char === "S") {
        startPostions.push([rowIndex, colIndex]);
        return 0;
      } else if (char === "E") {
        endPostions.push([rowIndex, colIndex]);
        return 26;
      }

      return char.charCodeAt(0) - 96;
    })
  );

  return {
    start: startPostions[0],
    end: endPostions[0],
    path,
  };
};

const input = parseInput(file);

const startPostions = input.start;
const endPostions = input.end;
const path = input.path;

const cordinatesToString = (cordinates: Cordinates): string => {
  return `${cordinates[0]}-${cordinates[1]}`;
};

console.log(cordinatesToString(endPostions));
