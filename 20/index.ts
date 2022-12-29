const file = await Deno.readTextFile("demo.txt");

/*
When you were still back at the camp, you overheard some Elves talking about coordinate file encryption. The main operation involved in decrypting the file is called mixing.
The encrypted file is a list of numbers. To mix the file, move each number forward or backward in the file a number of positions equal to the value of the number being moved. The list is circular, so moving a number off one end of the list wraps back around to the other end as if the ends were connected.
For example, to move the 1 in a sequence like 4, 5, 6, 1, 7, 8, 9, the 1 moves one position forward: 4, 5, 6, 7, 1, 8, 9. To move the -2 in a sequence like 4, -2, 5, 6, 7, 8, 9, the -2 moves two positions backward, wrapping around: 4, 5, 6, 7, 8, -2, 9.
The numbers should be moved in the order they originally appear in the encrypted file. Numbers moving around during the mixing process do not change the order in which the numbers are moved.


Consider this encrypted file:

1
2
-3
3
-2
0
4

Mixing this file proceeds as follows:

Initial arrangement:
1, 2, -3, 3, -2, 0, 4

1 moves between 2 and -3:
2, 1, -3, 3, -2, 0, 4

2 moves between -3 and 3:
1, -3, 2, 3, -2, 0, 4

-3 moves between -2 and 0:
1, 2, 3, -2, -3, 0, 4

3 moves between 0 and 4:
1, 2, -2, -3, 0, 3, 4

-2 moves between 4 and 1:
1, 2, -3, 0, 3, 4, -2

0 does not move:
1, 2, -3, 0, 3, 4, -2

4 moves between -3 and 0:
1, 2, -3, 4, 0, 3, -2


Then, the grove coordinates can be found by looking at the 1000th, 2000th, and 3000th numbers after the value 0, wrapping around the list as necessary.
In the above example,

the 1000th number after 0 is 4, 
the 2000th is -3, 
and the 3000th is 2; 

adding these together produces 3.

*/

const sequence = file.split("\n").map(Number);

// class CircularList<T> {
//   private length = 0;

//   public get count() {
//     return this.length;
//   }

//   public init(value: T): Node<T> {
//     const node = new Node(value);
//     node.next = node;
//     node.prev = node;
//     this.length = 1;
//     return node;
//   }

//   public insertAfter(node: Node<T>, value: T): Node<T> {

// }

class Node {
  value: number;
  next: Node | null = null;
  prev: Node | null = null;
  origNext: Node | null = null;

  constructor(value: number) {
    this.value = value * 811589153;
    this.next = this;
    this.prev = this;
    this.origNext = this;
  }
}

const nodes = sequence.map((value) => new Node(value));

const getStartNode = (node: Node): Node => {
  let current = node;
  while (current.value !== 0) {
    current = current.next!;
  }
  return current;
};

const getNthValue = (node: Node, n: number): number => {
  let current = node;
  for (let i = 0; i < n; i++) {
    current = current.next!;
  }
  return current.value;
};

for (let i = 1; i < nodes.length; i++) {
  nodes[i - 1].next = nodes[i];
  nodes[i].prev = nodes[i - 1];

  nodes[i - 1].origNext = nodes[i];
}

// Set the last node to point to the first node
nodes[nodes.length - 1].next = nodes[0];
nodes[nodes.length - 1].origNext = nodes[0];
nodes[0].prev = nodes[nodes.length - 1];

const listStart = nodes[0];

let curr = listStart;
do {
  if (curr.value === 0) {
    curr = curr.origNext;
    continue;
  }

  curr.prev.next = curr.next;
  curr.next.prev = curr.prev;

  let newPrev = curr;
  for (let i = 0; i < Math.abs(curr.value); i++) {
    if (curr.value < 0) newPrev = newPrev.prev;
    else newPrev = newPrev.next;
  }
  if (curr.value < 0) newPrev = newPrev.prev;

  curr.next = newPrev.next;
  curr.prev = newPrev;
  curr.next.prev = curr;
  curr.prev.next = curr;

  curr = curr.origNext;
} while (curr != listStart);

const zero = getStartNode(nodes[0]);

const result = [
  getNthValue(zero, 1000),
  getNthValue(zero, 2000),
  getNthValue(zero, 3000),
].reduce((a, b) => a + b);

console.log(result);
