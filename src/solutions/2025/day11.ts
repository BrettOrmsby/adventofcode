import { Graph, type Solution } from "../../common/index.ts";

export class Day11Year2025 implements Solution {
  // Complete a simple depth first search to find the number of paths
  // ending in "out"
  first(input: string): number {
    const graph = this.createGraph(input);
    return graph.countPaths("you", "out");
  }

  // We still do a depth first search, but we also keep track of if
  // we hit `dac` or `fft` between `svr` and `out`
  second(input: string): number {
    const graph = this.createGraph(input);
    return graph.countPaths("svr", "out", ["fft", "dac"]);
  }

  private createGraph(input: string): Graph<string> {
    const graph = new Graph<string>();
    for (const line of input.split("\n")) {
      const [from, ...to] = line.split(/:? /g);
      for (const node of to) {
        graph.addEdge(from, node);
      }
    }

    return graph;
  }
}
