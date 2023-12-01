const file = await Deno.readTextFile("./input.txt");
const datastream = file.split("");

for (let i = 0; i < datastream.length - 3; i++) {
  if (new Set([...datastream.slice(i, i + 14)]).size === 14) {
    console.log(i + 14);
    break;
  }
}
