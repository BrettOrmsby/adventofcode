export class WeightedGraph<T> {
  private readonly graph: Map<T, Map<T, number>>;

  constructor() {
    this.graph = new Map();
  }

  public addNode(n: T) {
    if (!this.graph.has(n)) this.graph.set(n, new Map());
  }

  public removeNode(n: T) {
    if (!this.graph.has(n)) return;
    this.graph.delete(n);
    for (const node of this.graph.keys()) {
      this.graph.get(node)!.delete(n);
    }
  }

  public addEdge(from: T, to: T, weight: number) {
    if (!this.graph.has(from)) {
      this.graph.set(from, new Map());
    }
    if (!this.graph.has(to)) {
      this.graph.set(to, new Map());
    }
    this.graph.get(from)!.set(to, weight);
  }
  public removeEdge(from: T, to: T): boolean {
    if (!this.graph.has(from)) return false;
    return this.graph.get(from)!.delete(to);
  }

  public addUndirectedEdge(a: T, b: T, weight: number) {
    this.addEdge(a, b, weight);
    this.addEdge(b, a, weight);
  }

  public removeUndirectedEdge(a: T, b: T) {
    this.removeEdge(a, b);
    this.removeEdge(b, a);
  }

  public outEdges(a: T): T[] {
    return this.graph.get(a)?.keys()?.toArray() ?? [];
  }

  public shortestCompletePath(): number {
    const numberOfNodes = this.graph.size;

    const dfs = (n: T, cost: number, visited: Set<T> = new Set()): number => {
      if (visited.size === numberOfNodes) return cost;

      let min = Infinity;
      for (const to of this.outEdges(n)) {
        if (visited.has(to)) continue;

        visited.add(to);
        const edgeCost = this.graph.get(n)!.get(to)!;
        const result = dfs(to, cost + edgeCost, visited);
        min = Math.min(result, min);
        visited.delete(to);
      }

      return min;
    };

    let min = Infinity;
    for (const node of this.graph.keys()) {
      const visited = new Set([node]);
      const result = dfs(node, 0, visited);
      min = Math.min(result, min);
    }
    return min;
  }

  public dijkstra(start: T): Map<T, number> {
    const distances = new Map<T, number>();
    this.graph.keys().forEach((k) => distances.set(k, Infinity));
    distances.set(start, 0);

    // Note: this is not a real priority queue
    const priorityQueue = [start];
    while (priorityQueue.length) {
      const minNodeIndex: number = priorityQueue.reduce(
        (minI, node, i) =>
          distances.get(node)! < distances.get(priorityQueue[minI])! ? i : minI,
        0,
      );
      const [node] = priorityQueue.splice(minNodeIndex, 1);

      for (const neighbor of this.outEdges(node)) {
        const alt = distances.get(node)! + this.graph.get(node)!.get(neighbor)!;
        if (alt < distances.get(neighbor)!) {
          distances.set(neighbor, alt);
          priorityQueue.push(neighbor);
        }
      }
    }

    return distances;
  }

  public longestCompletePath(): number {
    const numberOfNodes = this.graph.size;

    const dfs = (n: T, cost: number, visited: Set<T> = new Set()): number => {
      if (visited.size === numberOfNodes) return cost;

      let max = -1;
      for (const to of this.outEdges(n)) {
        if (visited.has(to)) continue;

        visited.add(to);
        const edgeCost = this.graph.get(n)!.get(to)!;
        const result = dfs(to, cost + edgeCost, visited);
        max = Math.max(result, max);
        visited.delete(to);
      }

      return max;
    };

    let max = -1;
    for (const node of this.graph.keys()) {
      const visited = new Set([node]);
      const result = dfs(node, 0, visited);
      max = Math.max(result, max);
    }
    return max;
  }
}
