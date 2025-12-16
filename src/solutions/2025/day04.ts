import { Graph, type Solution } from "../../common/index.ts";

export class Day04Year2025 implements Solution {
  // Use a graph to connect adjacent papers and sum the nodes with fewer
  // than 4 outEdges
  first(input: string): number {
    const graph = this.createGraph(input);
    return graph
      .getNodes()
      .reduce(
        (sum, node) => (graph.outEdges(node).length < 4 ? sum + 1 : sum),
        0
      );
  }

  // Use a graph and a stack to check all nodes, re-adding all
  // outEdges whenever a node is removed since they may now have
  // fewer connections
  second(input: string): number {
    const graph = this.createGraph(input);
    let sumMovable = 0;

    const nodesToCheck = graph.getNodes();
    const visited = new Set<string>();
    while (nodesToCheck.length > 0) {
      const node = nodesToCheck.pop()!;
      if (visited.has(node)) continue;

      if (graph.outEdges(node).length < 4) {
        sumMovable += 1;
        visited.add(node);
        for (const outNode of graph.outEdges(node)) {
          graph.removeUndirectedEdge(node, outNode);
          nodesToCheck.push(outNode);
        }
      }
    }
    return sumMovable;
  }

  private createGraph(input: string): Graph<string> {
    const data = input.split("\n").map((line) => line.split(""));
    const width = data[0].length;
    const height = data.length;
    const graph = new Graph<string>();
    const pointToKey = (x: number, y: number) => `${x},${y}`;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[y][x] !== "@") continue;
        const key = pointToKey(x, y);
        graph.addNode(key);
        if (y > 0) {
          if (data[y - 1][x] === "@") {
            graph.addUndirectedEdge(key, pointToKey(x, y - 1));
          }
          if (x > 0 && data[y - 1][x - 1] === "@") {
            graph.addUndirectedEdge(key, pointToKey(x - 1, y - 1));
          }
          if (x < width && data[y - 1][x + 1] === "@") {
            graph.addUndirectedEdge(key, pointToKey(x + 1, y - 1));
          }
        }
        if (x > 0 && data[y][x - 1] === "@") {
          graph.addUndirectedEdge(key, pointToKey(x - 1, y));
        }
      }
    }
    return graph;
  }
}
