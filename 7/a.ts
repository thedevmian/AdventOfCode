const file = await Deno.readTextFile("./input.txt");
const commandLine = file.split("\n");

const currentDir: string[] = [];
const fileStack = {};

commandLine.forEach((line) => {
  if (line.startsWith("$")) {
    const [_, command, path] = line.split(" ");
    if (command === "cd") {
      path === ".." ? currentDir.pop() : currentDir.push(path);
    } else if (command === "ls") {
      fileStack[currentDir] = 0;
    }
  } else {
    if (!line.startsWith("dir")) {
      const [size, _] = line.split(" ");
      fileStack[currentDir] += parseInt(size);
    }
  }
});

const fileStackEntries = Object.entries(fileStack);
const dirSize = [];
fileStackEntries.forEach((entry) => {
  const [name, size] = entry;
  let subDirTotalSize = 0;
  fileStackEntries.forEach((entry) => {
    const [subName, subDirSize] = entry;
    if (subName.startsWith(name) && subName !== name) {
      subDirTotalSize += subDirSize;
    }
  });
  dirSize.push(size + subDirTotalSize);
});

console.log(dirSize);

// Part 1
console.log(
  dirSize.filter((value) => value <= totalSize).reduce((a, b) => a + b)
);

// Part 2
const DISK_SPACE = 70000000;
const UNUSED_SPACE_NEEDED = 30000000;
const size = UNUSED_SPACE_NEEDED - (DISK_SPACE - dirSize[0]);

const candidateDirectories = dirSize.filter((value) => value >= size);
console.log(Math.min(...candidateDirectories));
