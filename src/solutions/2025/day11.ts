import type { Solution } from "../../common/index.ts";

export class Day11Year2025 implements Solution {
  first(input: string): number {
    const dataToGraph = () => {
      const data = input;
      const graph: Record<string, string[]> = Object.fromEntries(
        data.split("\n").map((line) => {
          const [from, ...to] = line.split(/:? /g);
          return [from, to];
        })
      );

      return graph;
    };

    const graph = dataToGraph();

    // A Que would be better, but this is what we have
    // Or A DFS with stack
    let count = 0;
    let paths = graph.you.map((start) => ["you", start]);
    while (paths.length > 0) {
      const newPaths: string[][] = [];
      for (const path of paths) {
        for (const next of graph[path.at(-1)!]) {
          if (next === "out") count += 1;
          else if (!path.includes(next)) newPaths.push([...path, next]);
        }
      }
      paths = newPaths;
    }
    return count;
  }

  second(input: string): number {
    const dataToGraph = () => {
      const data = input;
      const graph: Record<string, string[]> = Object.fromEntries(
        data.split("\n").map((line) => {
          const [from, ...to] = line.trim().split(/:? /g);
          return [from, to];
        })
      );

      return graph;
    };

    const graph = dataToGraph();
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
}
