const file = await Deno.readTextFile("test.txt");
const data = file.split("\n\n");

type Monkey = {
  id: number;
  startingItems: number[];
  operations: {
    type: "add" | "multiply";
    value: number | "old";
  };
  testDivisibleBy: number;
  passTest: number;
  failTest: number;
  inspectNumber: number;
};

const parseMonkey = (data: string[]): Monkey[] => {
  const monkeys: Monkey[] = [];

  data.forEach((line) => {
    if (line.startsWith("Monkey ")) {
      const monkey: Monkey = {
        id: Number(line.replace("Monkey ", "").slice(0, 1)),
        startingItems: [],
        operations: { type: "add", value: 0 },
        testDivisibleBy: 0,
        passTest: -1,
        failTest: -1,
        inspectNumber: 0,
      };
      const lines = line.split("\n");
      lines.forEach((line) => {
        if (line.startsWith("  Starting items:")) {
          const items = line.replace("  Starting items: ", "").split(", ");
          monkey.startingItems = items.map((item) => Number(item));
        }
        if (line.startsWith("  Operation:")) {
          const data = line.replace("  Operation: new = old ", "").split(" ");
          const type = data[0];
          if (type === "+") {
            monkey.operations.type = "add";
          } else if (type === "*") {
            monkey.operations.type = "multiply";
          }
          const value = data[1];
          if (value === "old") {
            monkey.operations.value = "old";
          } else {
            monkey.operations.value = Number(value);
          }
        }
        if (line.startsWith("  Test:")) {
          const value = line.replace("  Test: divisible by ", "");
          monkey.testDivisibleBy = Number(value);
        }
        if (line.startsWith("    If true:")) {
          const value = line.replace("    If true: throw to monkey ", "");
          monkey.passTest = Number(value);
        }
        if (line.startsWith("    If false:")) {
          const value = line.replace("    If false: throw to monkey ", "");
          monkey.failTest = Number(value);
        }
      });
      monkeys.push(monkey);
    }
  });

  return monkeys;
};

const monkeys = parseMonkey(data);

// Part 1:
// Round 1

const isDivisibleBy = (number: number, divisor: number) => {
  return number % divisor === 0;
};

const throwToMonkey = (
  monkeys: Monkey[],
  monkey: number,
  worryLevel: number
) => {
  monkeys[monkey].startingItems.push(worryLevel);
};

const monkeyInspect = (monkey: Monkey): number => {
  return monkey.inspectNumber++;
};

const roundWorryLevel = (worryLevel: number): number => {
  return Math.floor(worryLevel / 3);
};

const round = (monkeys: Monkey[]) => {
  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i];
    const lengthStartingItems = monkey.startingItems.length;

    for (let j = 0; j < lengthStartingItems; j++) {
      let worryLevel = monkey.startingItems[j];

      if (monkey.operations.type === "add") {
        if (monkey.operations.value === "old") {
          worryLevel += worryLevel;
        }
        if (typeof monkey.operations.value === "number") {
          worryLevel = worryLevel + monkey.operations.value;
        }
      } else if (monkey.operations.type === "multiply") {
        if (monkey.operations.value === "old") {
          worryLevel = worryLevel * worryLevel;
        }
        if (typeof monkey.operations.value === "number") {
          worryLevel = worryLevel * monkey.operations.value;
        }
      }
      worryLevel = roundWorryLevel(worryLevel);

      if (isDivisibleBy(worryLevel, monkey.testDivisibleBy)) {
        throwToMonkey(monkeys, monkey.passTest, worryLevel);
        monkeyInspect(monkey);
      } else {
        throwToMonkey(monkeys, monkey.failTest, worryLevel);
        monkeyInspect(monkey);
      }
    }
    monkey.startingItems.splice(0, lengthStartingItems);
  }
  return monkeys;
};

let result;

for (let i = 0; i < 20; i++) {
  result = round(monkeys);
}

const finalResult = result
  ?.filter((monkey) => monkey.inspectNumber)
  .sort((a, b) => b.inspectNumber - a.inspectNumber)
  .slice(0, 2)
  .reduce((acc, cur) => {
    return acc * cur.inspectNumber;
  }, 1);

console.log("Two most inspected monkeys multiplied: ", finalResult);
