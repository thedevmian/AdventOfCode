const file = await Deno.readTextFile("demo.txt");

type Valve = {
  name: string;
  flowRate: number;
  tunnels: string[];
};

function parseFile(file: string) {
  const valves: Valve[] = [];

  const lines = file.split("\n");

  lines.forEach((line) => {
    const name = line.split(" ")[1];
    const flowRate = parseInt(line.split(" ")[4].replace("rate=", ""));
    const tunnels = line.match(/[A-Z][A-Z]/g)?.slice(1) ?? [];

    valves.push({ name, flowRate, tunnels });
  });
  return valves;
}

console.log(parseFile(file).sort((a, b) => b.flowRate - a.flowRate));

let time = 30;
const nonBrokenValves = parseFile(file)
  .filter((valve) => valve.flowRate)
  .sort((a, b) => b.flowRate - a.flowRate);

const main = () => {
  let newTime = time;

  let fileValves = parseFile(file);
  let newFileValves = fileValves;
  //   while (newTime > 0) {
  // here we have 30 minutes to open as many valves as possible
  // we need to open the valves with the highest flow rate first
  // to do this we need to sort the valves by flow rate and then open them one by one until we run out of time or valves
  // we need to keep track of the time and the valves that are open

  // }

  console.log(nonBrokenValves);
};

main();
