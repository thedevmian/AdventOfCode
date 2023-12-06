const file = await Deno.readTextFile('./data.txt');
const lines = file.split('\n');

const times = Number(lines[0].split(": ")[1].trim().split(" ").filter((x) => x !== "").join(""));
const distances = Number(lines[1].split(": ")[1].trim().split(" ").filter((x) => x !== "").join(""));
let result = 0;

for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    let nrWays = 0;
    for (let j = 0; j <= time; j++) {
        const passedDistance = j * (time - j);
        if (passedDistance > distance) {
            nrWays += 1;
        }

    }
    result *= nrWays;
}


for (let i = 0; i < times; i++) {
    const passedDistance = i * (times - i);
    if (passedDistance > distances) {
        result += 1;
    }
}

// (pressedTime * (times - pressedTime)) > distances
// x(t-x) > d
// xt - x^2 > d
// x^2 - xt + d < 0
// x = (times +- sqrt(times^2 - 4 * distances)) / 2

console.log(times);
console.log(distances);
console.log(result);

const permormance = performance.now();
console.log("time: ", permormance);