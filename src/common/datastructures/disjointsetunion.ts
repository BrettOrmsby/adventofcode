// Based on https://cp-algorithms.com/data_structures/disjoint_set_union.html
export class DisjointSetUnion<T> {
  private readonly parent: Map<T, T>;
  private readonly rank: Map<T, number>;
  private unionCount: number;

  constructor() {
    this.parent = new Map();
    this.rank = new Map();
    this.unionCount = 0;
  }

  makeSet(value: T) {
    if (!this.parent.has(value)) {
      this.parent.set(value, value);
      this.rank.set(value, 0);
    }
  }

  unionSets(a: T, b: T) {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA != rootB) {
      this.unionCount += 1;
      const rankA = this.rank.get(rootA)!;
      const rankB = this.rank.get(rootB)!;
      if (rankA < rankB) {
        this.parent.set(rootA, rootB);
      } else if (rankA > rankB) {
        this.parent.set(rootB, rootA);
      } else {
        this.parent.set(rootB, rootA);
        this.rank.set(rootA, rankA + 1);
      }
    }
  }

  find(value: T): T {
    this.makeSet(value);
    if (this.parent.get(value) !== value) {
      this.parent.set(value, this.find(this.parent.get(value)!));
    }

    return this.parent.get(value)!;
  }

  unionSizes(): Map<T, number> {
    const sizes = new Map<T, number>();
    for (const element of this.parent.keys()) {
      const root = this.find(element);
      sizes.set(root, (sizes.get(root) ?? 0) + 1);
    }
    return sizes;
  }

  getUnionCount(): number {
    return this.unionCount;
  }
}
