const grid = [
  [1, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
  [1, 1, 1, 1, 0],
  [0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1],
];


const start = [0, 0];
const end = [4, 4];

const dijkstra = (grid, start, end) => {
    const rows = grid.length;
    const cols = grid[0].length;

    // distances from the starting point to each cell 
    const dist = new Array(rows).fill(null).map(() => new Array(cols).fill(Infinity));

    // previous cell for each cell in the path 
    // that is helpful to know the path 