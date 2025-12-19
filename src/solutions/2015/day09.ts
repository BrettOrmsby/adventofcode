import { type Solution, WeightedGraph } from "../../common/index.ts";
export class Day09Year2015 implements Solution {
  // Use a weighted graph (and dfs) to find the shortest complete path
  first(input: string): number {
    return this.createGraph(input).shortestCompletePath();
  }

  // Use a weighted graph (and dfs) to find the longest complete path
  second(input: string): number {
    return this.createGraph(input).longestCompletePath();
  }

  private createGraph(input: string): WeightedGraph<string> {
    const graph = new WeightedGraph<string>();
    for (const line of input.split("\n")) {
      const [_, from, to, distance] = line.match(/^(.+?) to (.+?) = (\d+)$/)!;
      graph.addUndirectedEdge(from, to, Number(distance));
    }
    return graph;
  }
}
