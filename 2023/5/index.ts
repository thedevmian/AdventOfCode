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
// const procedures = [seedsToSoil]
// Part 1
// create array of seed-to-soil
const seedToSoilArray: number[][] = [];
const soilAfterProcedure: number[][] = [];

function almanacListsProceed(procedures, seeds) {
    for (let i = 0; i < procedures.length; i++) {
        const procedure = procedures[i];

        // const newSeeds: number[] = [
        //     ...seeds,
        // ];
        // procedure.forEach((i) => {

        //     for (let j = 0; j < seeds.length; j++) {
        //         console.log(j, i);
        //         let seedNr: number;
        //         if (j >= i[1] && j <= i[1] + i[2] - 1) {
        //             seedNr = j - (i[1] - i[0]);
        //         } else {
        //             seedNr = j;
        //         }
        //         newSeeds.push(seedNr);
        //     }

        //     seeds = newSeeds;
        // });

        while

        // console.log(seeds);
    }
}

// translate seeds to almanac procedure



almanacListsProceed(procedures, seeds);
// console.log(result.sort()[0]);

