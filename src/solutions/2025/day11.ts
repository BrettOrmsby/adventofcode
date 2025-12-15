import type { Solution } from "../../common/index.ts";

type Graph = Record<string, string[]>;

export class Day11Year2025 implements Solution {
  // Complete a simple depth first search to find the number of paths
  // ending in "out"
  first(input: string): number {
    const graph = this.createGraph(input);

    const map = new Map<string, number>();
    const dfs = (node: string): number => {
      if (node === "out") {
        return 1;
      }

      if (map.has(node)) return map.get(node)!;

      const sum = graph[node].reduce((sum, next) => sum + dfs(next), 0);
      map.set(node, sum);
      return sum;
    };

    return dfs("you");
  }

  // We still do a depth first search, but we also keep track of if
  // we hit `dax` or `fft` between `svr` and `out`
  second(input: string): number {
    const graph = this.createGraph(input);
    const map = new Map<string, number>();
    const dfs = (n: string, hasDAC: boolean, hasFFT: boolean): number => {
      if (n === "out") {
        if (hasDAC && hasFFT) return 1;
        return 0;
      }

      if (n === "fft") hasFFT = true;
      if (n === "dac") hasDAC = true;
      const key = `${n}|${hasFFT}|${hasDAC}`;

      if (map.has(key)) return map.get(key)!;
      const sum = graph[n].reduce((sum, n) => sum + dfs(n, hasDAC, hasFFT), 0);
      map.set(key, sum);

      return sum;
    };

    return dfs("svr", false, false);
  }

  private createGraph(input: string): Graph {
    const graph: Graph = Object.fromEntries(
      input.split("\n").map((line) => {
        const [from, ...to] = line.split(/:? /g);
        return [from, to];
      })
    );

    return graph;
  }
}
