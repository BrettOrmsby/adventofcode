export class Graph<T> {
  private readonly graph: Map<T, Set<T>>;

  constructor() {
    this.graph = new Map();
  }

  public addNode(n: T) {
    if (!this.graph.has(n)) this.graph.set(n, new Set());
  }

  public removeNode(n: T) {
    if (!this.graph.has(n)) return;
    this.graph.delete(n);
    for (const node of this.graph.keys()) {
      this.graph.get(node)!.delete(n);
    }
  }

  public addEdge(from: T, to: T) {
    if (!this.graph.has(from)) {
      this.graph.set(from, new Set());
    }
    if (!this.graph.has(to)) {
      this.graph.set(to, new Set());
    }
    this.graph.get(from)!.add(to);
  }
  public removeEdge(from: T, to: T): boolean {
    if (!this.graph.has(from)) return false;
    return this.graph.get(from)!.delete(to);
  }

  public addUndirectedEdge(a: T, b: T) {
    this.addEdge(a, b);
    this.addEdge(b, a);
  }

  public removeUndirectedEdge(a: T, b: T) {
    this.removeEdge(a, b);
    this.removeEdge(b, a);
  }

  public outEdges(a: T): T[] {
    return this.graph.get(a)?.values()?.toArray() ?? [];
  }

  public getNodes(): T[] {
    return this.graph.keys().toArray();
  }

  public countPaths(from: T, to: T, include: T[] = []): number {
    const map = new Map<string, number>();

    const dfs = (n: T, includes: Record<string, boolean>): number => {
      if (n === to) {
        if (Object.values(includes).every((value) => value)) return 1;
        return 0;
      }

      includes = { ...includes };
      for (const key in includes) {
        if (key == n) includes[key] = true;
      }
      const key = `${n}|${JSON.stringify(includes)}`;

      if (map.has(key)) return map.get(key)!;
      const sum = this.outEdges(n).reduce(
        (sum, n) => sum + dfs(n, includes),
        0
      );
      map.set(key, sum);

      return sum;
    };

    const includes = Object.fromEntries(
      include.map((include) => [include, false])
    );
    return dfs(from, includes);
  }
}
