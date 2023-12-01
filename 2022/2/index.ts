const file = await Deno.open("./input.txt", { read: true });
const fileInfo = await file.stat();
const fileContent = new Uint8Array(fileInfo.size);
let content = "";

if (fileInfo.isFile) {
  await file.read(fileContent);
  content = new TextDecoder().decode(fileContent);
}

const result = 0;

const calculateShapePoint = (shape: string) => {
  if (shape === "X" || shape === "A") {
    return 1;
  } else if (shape === "Y" || shape === "B") {
    return 2;
  } else if (shape === "Z" || shape === "C") {
    return 3;
  }
};

const whoWins = (shape1: string, shape2: string) => {
  if (shape1 === shape2) {
    return 3;
  } else if (
    (shape1 === "A" && shape2 === "B") ||
    (shape1 === "B" && shape2 === "C") ||
    (shape1 === "C" && shape2 === "A")
  ) {
    return 6;
  }
  return 0;
};

const loseShape = (shape1: string) => {
  if (shape1 === "A") {
    return "C";
  } else if (shape1 === "B") {
    return "A";
  } else if (shape1 === "C") {
    return "B";
  }
};

const winShape = (shape1: string) => {
  if (shape1 === "A") {
    return "B";
  } else if (shape1 === "B") {
    return "C";
  } else if (shape1 === "C") {
    return "A";
  }
};

if (content) {
  const lines = content.split(/\r?\n/);
  let result = 0;
  let player2Points = 0;
  let competitionPoints = 0;

  for (let line of lines) {
    if (line.length > 0) {
      let [player1, player2] = line.split(" ");

      player2 = player2.replace(/[XYZ]/g, (match) => {
        if (match === "X") {
          return loseShape(player1);
        }
        if (match === "Y") {
          return player1;
        }
        if (match === "Z") {
          return winShape(player1);
        }
      });

      player2Points += calculateShapePoint(player2);
      competitionPoints += whoWins(player1, player2);
    }
  }

  result = player2Points + competitionPoints;

  console.log("Competition points: ", competitionPoints);
  console.log("Player 2 points: ", player2Points);
  console.log("Result: ", result);
}
