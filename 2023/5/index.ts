const file = Bun.file('./test.txt');
const fileText = await file.text();
const data = fileText.split('\n\n');

const seeds = data[0].split(': ')[1].split('\n').map(line => line.split(' ').map(Number)).flat();
const seedsToSoil = data[1].split('\n').slice(1).map(line => line.split(' ').map(Number));
const soilToFertilizer = data[2].split('\n').slice(1).map(line => line.split(' ').map(Number));
const fertilizerToWater = data[3].split('\n').slice(1).map(line => line.split(' ').map(Number));
const waterToLight = data[4].split('\n').slice(1).map(line => line.split(' ').map(Number));
const lightToTemperature = data[5].split('\n').slice(1).map(line => line.split(' ').map(Number));
const temperatureToHumidity = data[6].split('\n').slice(1).map(line => line.split(' ').map(Number));
const humidityToLocation = data[7].split('\n').slice(1).map(line => line.split(' ').map(Number));

const procedures = [seedsToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation];


// Part 1
function almanacListsProceed(procedures, seeds) {
    for (let i = 0; i < procedures.length; i++) {
        const procedure = procedures[i];

        for (let j = 0; j < seeds.length; j++) {
            const seed = seeds[j];

            for (let k = 0; k < procedure.length; k++) {
                const line = procedure[k];
                if (seed >= line[1] && seed <= line[1] + line[2] - 1) {
                    const newSeed = seed - (line[1] - line[0]);
                    // console.log(newSeed);
                    seeds[j] = newSeed;
                    continue;
                }
            }
        }
        // console.log(seeds, '----------------', procedure);
    }
}



// `almanacListsProceed(procedures, seeds);
// console.log(seeds);
// console.log(seeds.sort((a, b) => a - b)[0]);`

// Part 2
const seedRange = [];
for (let i = 0; i < seeds.length; i += 2) {
    const endSeed = seeds[i] + seeds[i + 1] - 1;
    seedRange.push([seeds[i], endSeed]);
}

// console.log(seedRange);

function findMinSeedRange(procedures, seeds) {
    for (let i = 0; i < procedures.length; i++) {
        const procedure = procedures[i];
        for (let j = 0; j < procedure.length; j++) {
            const [a, b, c] = procedure[j];
            let newSeeds = [];
            while (seeds.length > 0) {
                const [startSeed, endSeed] = seeds[0];
                seeds.shift();
                const os = Math.max(startSeed, b);
                const oe = Math.min(endSeed, b + c - 1);

                if (os < oe) {
                    const newSeed = [os - (b - a), oe - (b - a)];
                    newSeeds.push(newSeed);

                    if (os > startSeed) {
                        seeds.push([startSeed, os]);
                    }
                    if (oe < endSeed) {
                        seeds.push([oe, endSeed]);
                    }
                    continue;

                } else {
                    newSeeds.push([startSeed, endSeed]);
                }
            }
            seeds = newSeeds;
        }
    }
    return seeds.sort()
}

findMinSeedRange(procedures, seedRange);
// console.log(seedRange)
