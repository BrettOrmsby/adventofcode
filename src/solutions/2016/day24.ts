import type { Solution } from "../../common/index.ts";
import { WeightedGraph } from "../../common/index.ts";
import { permute } from "../../common/index.ts";

interface PointNode {
  x: number;
  y: number;
  node: string;
}
interface GraphStates {
  graph: WeightedGraph<string>;
  goalNodes: string[];
  start: string;
}

export class Day24Year2016 implements Solution {
  first(input: string): number {
    // Create a weighted graph where the nodes are all intersections,
    // dead ends, and number locations. Then find the distances between
    // all numbered spaces using dijkstra's algorithm. Finally, find the
    // minimum distance by checking all permutations of the numbered
    // spaces except always starting at the starting node
    const { graph, goalNodes, start } = this.createGrid(input);

    const allParts = [start, ...goalNodes];
    const segments = new Map<string, number>();
    for (const fromNode of allParts) {
      const shortestPaths = graph.dijkstra(fromNode);
      for (const toNode of allParts) {
        segments.set(`${fromNode},${toNode}`, shortestPaths.get(toNode)!);
      }
    }

    let min = Infinity;
    for (const permutation of permute(goalNodes)) {
      let sumDist = segments.get(`${start},${permutation[0]}`)!;
      for (let i = 0; i < permutation.length - 1; i++) {
        sumDist += segments.get(`${permutation[i]},${permutation[i + 1]}`)!;
      }
      min = Math.min(sumDist, min);
    }
    return min;
  }

  // Do the same as part 1, but also add the distance between
  // the start node and the end of the permutation.
  second(input: string): number {
    const { graph, goalNodes, start } = this.createGrid(input);

    const allParts = [start, ...goalNodes];
    const segments = new Map<string, number>();
    for (const fromNode of allParts) {
      const shortestPaths = graph.dijkstra(fromNode);
      for (const toNode of allParts) {
        segments.set(`${fromNode},${toNode}`, shortestPaths.get(toNode)!);
      }
    }

    let min = Infinity;
    for (const permutation of permute(goalNodes)) {
      let sumDist =
        segments.get(`${start},${permutation[0]}`)! +
        segments.get(`${start},${permutation[permutation.length - 1]}`)!;
      for (let i = 0; i < permutation.length - 1; i++) {
        sumDist += segments.get(`${permutation[i]},${permutation[i + 1]}`)!;
      }
      min = Math.min(sumDist, min);
    }
    return min;
  }

  private createGrid(input: string): GraphStates {
    const rows = input.split("\n");
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    const graph = new WeightedGraph<string>();
    const goalNodes = new Set<string>();
    let startNode = "1,1";

    const visited = new Set<string>();
    const stack: PointNode[] = [{ x: 1, y: 1, node: "1,1" }];
    visited.add(`1,1`);
    graph.addNode(`1,1`);

    const isWall = (x: number, y: number) => rows[y][x] === "#";
    const isNode = (x: number, y: number) => {
      if (isWall(x, y)) return false;

      // All numbers are nodes
      if (rows[y][x] !== "#" && rows[y][x] !== ".") return true;

      // If there are 3 walls surrounding, it is a node
      const surroundingWallsCount = directions
        .map(([xOff, yOff]) => (isWall(x + xOff, y + yOff) ? 1 : 0))
        .reduce((sum, curr) => sum + curr, 0 as number);
      if (surroundingWallsCount >= 3) return true;

      // If there is a continuation in both x and y directions, it is a node
      const hasXContinuation = !isWall(x - 1, y) || !isWall(x + 1, y);
      const hasYContinuation = !isWall(x, y - 1) || !isWall(x, y + 1);
      if (hasXContinuation && hasYContinuation) return true;

      return false;
    };

    while (stack.length) {
      const { x, y, node } = stack.pop()!;

      for (const [xOff, yOff] of directions) {
        let length = 1;
        if (isWall(x + xOff * length, y + yOff * length)) continue;
        if (visited.has(`${x + xOff * length},${y + yOff * length}`)) continue;

        while (!isNode(x + xOff * length, y + yOff * length)) {
          visited.add(`${x + xOff * length},${y + yOff * length}`);
          length += 1;
        }

        const endX = x + xOff * length;
        const endY = y + yOff * length;

        const endNode = `${endX},${endY}`;
        graph.addNode(endNode);
        graph.addUndirectedEdge(endNode, node, length);
        visited.add(endNode);
        stack.push({
          x: endX,
          y: endY,
          node: endNode,
        });

        if (rows[endY][endX] === "0") {
          startNode = endNode;
        } else if (rows[endY][endX] !== ".") {
          goalNodes.add(endNode);
        }
      }
    }
    return { graph, goalNodes: [...goalNodes], start: startNode };
  }
}
