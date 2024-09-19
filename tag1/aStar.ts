export type Node = {
  x: number;
  y: number;
  g: number;
  h: number;
  f: number;
  parent: Node | null;
};

/**
 * Implements the A* pathfinding algorithm to find the shortest path between two nodes in a grid.
 *
 * @param start - The starting node.
 * @param end - The target node.
 * @param grid - A 2D array representing the grid where each cell can be traversable or not.
 * @returns An array of nodes representing the path from start to end, or null if no path is found.
 */
function aStar(start: Node, end: Node, grid: number[][]): Node[] | null {
  const openList: Node[] = [];
  const closedList: Node[] = [];
  openList.push(start);

  while (openList.length > 0) {
    // Get the node with the lowest f score
    let lowestIndex = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    const currentNode = openList[lowestIndex];

    // If we reached the end node, reconstruct the path
    if (currentNode.x === end.x && currentNode.y === end.y) {
      const path: Node[] = [];
      let temp: Node | null = currentNode;
      while (temp) {
        path.push(temp);
        temp = temp.parent;
      }
      return path.reverse();
    }

    // Move current node from open to closed list
    openList.splice(lowestIndex, 1);
    closedList.push(currentNode);

    // Get neighbors
    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (
        closedList.find(
          (node) => node.x === neighbor.x && node.y === neighbor.y
        )
      ) {
        continue;
      }

      const gScore = currentNode.g + 1;
      let gScoreIsBest = false;

      if (
        !openList.find((node) => node.x === neighbor.x && node.y === neighbor.y)
      ) {
        gScoreIsBest = true;
        neighbor.h = heuristic(neighbor, end);
        openList.push(neighbor);
      } else if (gScore < neighbor.g) {
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        neighbor.parent = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }

  // No path found
  return null;
}

function getNeighbors(node: Node, grid: number[][]): Node[] {
  const neighbors: Node[] = [];
  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  for (const direction of directions) {
    const x = node.x + direction.x;
    const y = node.y + direction.y;

    if (
      x >= 0 &&
      x < grid[0].length &&
      y >= 0 &&
      y < grid.length &&
      grid[y][x] === 0
    ) {
      neighbors.push({
        x,
        y,
        g: 0,
        h: 0,
        f: 0,
        parent: null,
      });
    }
  }

  return neighbors;
}

function heuristic(node: Node, end: Node): number {
  return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
}

// Example usage
const grid = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
];

const start: Node = { x: 0, y: 0, g: 0, h: 0, f: 0, parent: null };
const end: Node = { x: 4, y: 4, g: 0, h: 0, f: 0, parent: null };

const path = aStar(start, end, grid);
console.log(path);
