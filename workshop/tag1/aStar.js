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

/**
 * Implements the A* pathfinding algorithm to find the shortest path between two points on a grid.
 *
 * @param {number[][]} grid - A 2D array representing the grid where 0 is a walkable cell and any other value is an obstacle.
 * @param {Object} start - The starting node with properties x (column) and y (row).
 * @param {Object} end - The ending node with properties x (column) and y (row).
 * @returns {Object[]|null} - An array of nodes representing the path from start to end, or null if no path is found.
 */
const aStar = (grid, start, end) => {
  const openSet = [start]; // Initialize the open set with the start node
  const closedSet = new Set(); // Initialize the closed set as an empty set

  const serialize = (node) => `${node.x},${node.y}`; // Function to serialize a node's coordinates for easy comparison

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
            node.x + dir.x, // New x coordinate
            node.y + dir.y, // New y coordinate
            node.g + 1, // Increment g cost by 1
            heuristic({ x: node.x + dir.x, y: node.y + dir.y }, end), // Calculate heuristic h
            node // Set current node as parent
          )
      )
      .filter(
        (neighbor) =>
          neighbor.x >= 0 && // Ensure x is within grid bounds
          neighbor.y >= 0 && // Ensure y is within grid bounds
          neighbor.x < grid[0].length && // Ensure x is within grid width
          neighbor.y < grid.length && // Ensure y is within grid height
          grid[neighbor.y][neighbor.x] === 0 // Ensure the cell is walkable (not an obstacle)
      );
  };

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f); // Sort open set by f value (smallest first)
    const current = openSet.shift(); // Remove the node with the smallest f value

    if (current.x === end.x && current.y === end.y) {
      // If the end node is reached
      const path = []; // Initialize the path array
      let temp = current; // Start from the end node
      while (temp) {
        path.push(temp); // Add node to path
        temp = temp.parent; // Move to parent node
      }
      return path.reverse(); // Return the reversed path (from start to end)
    }

    closedSet.add(serialize(current)); // Add current node to closed set

    const neighborNodes = neighbors(current); // Get neighbors of the current node
    for (const neighbor of neighborNodes) {
      if (closedSet.has(serialize(neighbor))) {
        continue; // Skip if neighbor is already in closed set
      }

      const openNode = openSet.find(
        (node) => node.x === neighbor.x && node.y === neighbor.y
      ); // Find neighbor in open set

      if (!openNode || neighbor.g < openNode.g) {
        // If neighbor is not in open set or has a better g value
        neighbor.f = neighbor.g + neighbor.h; // Update f value
        if (!openNode) {
          openSet.push(neighbor); // Add neighbor to open set if not already present
        }
      }
    }
  }

  return null; // Return null if no path is found
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
