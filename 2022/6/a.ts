const file = await Deno.readTextFile("./input.txt");
const datastream = file.split("");

let startingChar = 0;

for (let i = 0; i < datastream.length - 3; i++) {
  const char = datastream[i];
  const substring = datastream.slice(i + 1, i + 4).join("");

  if (!substring.includes(char)) {
    if (startingChar === 3) {
      console.log(i + 1);
      break;
    }
    startingChar++;
  } else {
    startingChar = 0;
  }
}
