const grid = [
  [1, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
  [1, 1, 1, 1, 0],
  [0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1],
];

// 0 - obstacle
// 1 - empty space

// Find the shortest path from the top left corner to the bottom right corner
// You can move up, down, left, and right, but cannot move through obstacles

// The distance between adjacent cells is 1

class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.sort();
  }

  dequeue() {
    return this.elements.shift().element;
  }

  sort() {
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

function dijkstra(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;

  // distances from the starting point to each cell
  const dist = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(Infinity));

  // previous cell for each cell in the path
  const prev = new Array(rows).fill(null).map(() => new Array(cols).fill(null));

  // whether each cell has been visited
  const visited = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(false));

  // add the starting point to the queue with distance 0
  const queue = new PriorityQueue();

  dist[start[0]][start[1]] = 0;
  queue.enqueue([start[0], start[1]], 0);

  // while the queue is not empty
  while (!queue.isEmpty()) {
    // get the next cell from the queue
    const cell = queue.dequeue();
    const i = cell[0];
    const j = cell[1];

    // mark the cell as visited
    visited[i][j] = true;

    // if the cell is the end cell, we are done
    if (i === end[0] && j === end[1]) {
      break;
    }

    // check the neighbors of the cell
    for (const [di, dj] of [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ]) {
      const ni = i + di;
      const nj = j + dj;

      // skip the neighbor if it is out of bounds or it is not walkable
      if (ni < 0 || ni >= rows || nj < 0 || nj >= cols || grid[ni][nj] === 0) {
        continue;
      }

      // skip the neighbor if it has already been visited
      if (visited[ni][nj]) {
        continue;
      }

      // update the distance and previous cell for the neighbor
      const alt = dist[i][j] + 1; // assuming grid cells are 1 unit apart
      if (alt < dist[ni][nj]) {
        dist[ni][nj] = alt;
        prev[ni][nj] = [i, j];
        queue.enqueue([ni, nj], alt);
      }
    }
  }

  // if the end cell was not reached, return null
  if (dist[end[0]][end[1]] === Infinity) {
    return null;
  }

  // construct the shortest path by following the previous cells
  const path = [];
  let cell = end;
  while (cell !== null) {
    path.unshift(cell);
    cell = prev[cell[0]][cell[1]];
  }

  // return the shortest path
  return path;
}

console.log(dijkstra(grid, [0, 0], [4, 4]));
