const file = await Deno.open("./input.txt", { read: true });
const fileInfo = await file.stat();
const fileContent = new Uint8Array(fileInfo.size);
let content = "";

if (fileInfo.isFile) {
  await file.read(fileContent);
  content = new TextDecoder().decode(fileContent);
}

if (content) {
  const lines = content.split(/\r?\n/);
  let topThreeCarries = [];

  let accResult = 0;
  let results = [];

  for (const line of lines) {
    if (line.length > 0) {
      accResult += Number(line);
    } else {
      results.push(accResult);
      accResult = 0;
    }
  }

  const max = Math.max(...results);
  console.log("Max: ", max);

  // second part
  topThreeCarries = results.sort((a, b) => b - a).slice(0, 3);
  const sum = topThreeCarries.reduce((a, b) => a + b, 0);
  console.log("Sum: ", sum);
}
