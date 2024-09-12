class Node {
  constructor(x, y, g = 0, h = 0, parent = null) {
    this.x = x;
    this.y = y;
    this.g = g; // Distance from start node
    this.h = h; // Heuristic (estimated distance to end node)
    this.f = g + h; // Total cost (g + h)
    this.parent = parent; // Reference to the parent node for path reconstruction
  }
}

const heuristic = (a, b) => {
  // Manhattan Distance
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const aStar = (grid, start, end) => {
  const openSet = [start];
  const closedSet = new Set();

  const serialize = (node) => `${node.x},${node.y}`;

  const neighbors = (node) => {
    const dirs = [
      { x: 0, y: -1 }, // up
      { x: 1, y: 0 }, // right
      { x: 0, y: 1 }, // down
      { x: -1, y: 0 }, // left
    ];

    return dirs
      .map(
        (dir) =>
          new Node(
            node.x + dir.x,
            node.y + dir.y,
            node.g + 1,
            heuristic({ x: node.x + dir.x, y: node.y + dir.y }, end),
            node
          )
      )
      .filter(
        (neighbor) =>
          neighbor.x >= 0 &&
          neighbor.y >= 0 &&
          neighbor.x < grid[0].length &&
          neighbor.y < grid.length &&
          grid[neighbor.y][neighbor.x] === 0
      );
  };

  while (openSet.length > 0) {
    // Sort by f value (smallest first)
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();

    if (current.x === end.x && current.y === end.y) {
      // Reconstruct path
      const path = [];
      let temp = current;
      while (temp) {
        path.push(temp);
        temp = temp.parent;
      }
      return path.reverse();
    }

    closedSet.add(serialize(current));

    const neighborNodes = neighbors(current);
    for (const neighbor of neighborNodes) {
      if (closedSet.has(serialize(neighbor))) {
        continue;
      }

      const openNode = openSet.find(
        (node) => node.x === neighbor.x && node.y === neighbor.y
      );

      if (!openNode || neighbor.g < openNode.g) {
        neighbor.f = neighbor.g + neighbor.h;
        if (!openNode) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return null; // No path found
};

// Example usage
const grid = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
];

const start = new Node(0, 0);
const end = new Node(4, 4);

const path = aStar(grid, start, end);
console.log(path);
