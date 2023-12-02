const file = await Deno.readTextFile('./data.txt');
const dataStream = file.split('\n');

// which games has more than 12 red cubes, 13 green, 14 blue

const limits = new Map<string, number>([
    ['red', 12],
    ['green', 13],
    ['blue', 14]
]);

let countPotentialLose = [];
let countGames = 0;
let result = 0;

const data = dataStream.map((singleLine) => {
    const [game, substrings] = singleLine.split(':');

    const games = Array.from(substrings.split(';')).map((sub: any) => {
        const singleGame = sub.split(',').map((item: any) => {
            const [amount, color] = item.trim().split(' ');
            return [color, amount];
        })
        return singleGame;
    })

    const gameNumber = Number(game.replace('Game ', ""));
    countGames += gameNumber;

    function part1() {

        for (const game of games) {
            let flag = false;

            for (const cube of game) {
                switch (cube[0]) {
                    case 'blue':
                        if (cube[1] > 14 && !flag) {
                            countPotentialLose.push(gameNumber);
                            flag = true;
                        }
                        break;
                    case 'green':
                        if (cube[1] > 13 && !flag) {
                            countPotentialLose.push(gameNumber);
                            flag = true;
                        }
                        break;
                    case 'red':
                        if (cube[1] > 12 && !flag) {
                            countPotentialLose.push(gameNumber);
                            flag = true;
                        }
                        break;

                    default:
                        break;

                }
            }
        }

    }

    function part2() {
        let redMax = 0;
        let greenMax = 0;
        let blueMax = 0;
        for (const game of games) {
            for (const cube of game) {
                if (cube[0] === 'red') {
                    if (Number(cube[1]) > redMax) {
                        redMax = cube[1];
                    }
                } else if (cube[0] === 'green') {
                    if (Number(cube[1]) > greenMax) {
                        greenMax = cube[1];
                    }
                } else if (cube[0] === 'blue') {
                    if (Number(cube[1]) > blueMax) {
                        blueMax = cube[1];
                    }
                }
            }

        }
        result += redMax * greenMax * blueMax;
        return result;
    }
    part1();
    part2();
})

let SetLoss = new Set(countPotentialLose);
let sum = Array.from(SetLoss).reduce((a, b) => a + b, 0);

console.log("Part 1: " + (countGames - sum));
