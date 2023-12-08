const file = await Deno.readTextFile('./input.txt');


type Directions = {
    left: string,
    right: string
}

type Nodes = {
    headNode: string,
    directions: Directions
}

const [sequence, rest] = file.split('\n\n');
const nodeLines = rest.split('\n');
const network = new Map<string, Directions>();
nodeLines.forEach((node) => {
    const splitNode = node.split(' = ');

    const headNode = splitNode[0];
    const leftNode = splitNode[1].split(', ')[0].replace('(', '');
    const rightNode = splitNode[1].split(', ')[1].replace(')', '');

    const directions = {
        left: leftNode,
        right: rightNode
    }
    network.set(headNode, directions);
});

let instructions = sequence.split('');
let steps = 0;
let result = 0;
let currentNode = "AAA";

// console.log(network);

while (currentNode !== "ZZZ") {
    const directions = network.get(currentNode);
    const direction = instructions.shift();
    if (direction === "L") {
        currentNode = directions?.left;
    } else {
        currentNode = directions?.right;

    }
    instructions.push(direction);
    steps++;
    if (currentNode === "ZZZ") {
        result = steps;
    }
}

console.log(currentNode);
console.log(result);