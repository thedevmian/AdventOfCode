const text = await Deno.readTextFile("./input.txt");
const lines = text.split(/\r?\n/);

let result = 0;

lines.forEach((line) => {
  const [pair1, pair2] = line.split(",");

  let section1 = [Number(pair1.split("-")[0]), Number(pair1.split("-")[1])];
  let section2 = [Number(pair2.split("-")[0]), Number(pair2.split("-")[1])];

  if (section1[0] > section2[0]) {
    const temp = section1;
    section1 = section2;
    section2 = temp;
  }

  if (section1[0] >= section2[0] && section1[1] <= section2[1]) {
    result += 1;
  } else if (section1[0] <= section2[0] && section1[1] >= section2[1]) {
    result += 1;
  } else if (section1[1] >= section2[0] && section1[1] <= section2[1]) {
    result += 1;
  }
});

console.log("Result: ", result);

const t = performance.now();
console.log(`${t} ms since start!`);
