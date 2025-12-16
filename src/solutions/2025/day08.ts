import { DisjointSetUnion, type Solution } from "../../common/index.ts";

interface BoxPair {
  box: string;
  connection: string;
  dist: number;
}

export class Day08Year2025 implements Solution {
  // Create and order pairs of boxes by shortest distance, then
  // use a disjoint set union to handle connected components
  first(input: string): number {
    const boxes = input.split("\n");

    const orderedPairs = this.getOrderedPairs(boxes);

    const disjointSetUnion = new DisjointSetUnion<string>();
    for (let i = 0; i < 1000; i++) {
      const { box, connection } = orderedPairs[i];
      disjointSetUnion.unionSets(box, connection);
    }
    const sortedSizes = disjointSetUnion
      .unionSizes()
      .values()
      .toArray()
      .sort((a, b) => b - a);

    const result = sortedSizes[0] * sortedSizes[1] * sortedSizes[2];
    return result;
  }

  // We do the exact same thing as part 1, but repeat until all components
  // are connected
  second(input: string): number {
    const boxes = input.split("\n");

    const orderedPairs = this.getOrderedPairs(boxes);

    const disjointSetUnion = new DisjointSetUnion<string>();
    let i = 0;
    while (true) {
      const { box, connection } = orderedPairs[i];
      disjointSetUnion.unionSets(box, connection);
      i += 1;

      if (disjointSetUnion.getUnionCount() === boxes.length - 1) {
        const [x, ..._] = this.toNums(box);
        const [x2, ...__] = this.toNums(connection);
        return x * x2;
      }
    }
  }

  private getOrderedPairs(boxes: string[]): BoxPair[] {
    const orderedPairs: BoxPair[] = [];
    for (let i = 0; i < boxes.length - 1; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        orderedPairs.push({
          box: boxes[i],
          connection: boxes[j],
          dist: this.distanceBetween(boxes[i], boxes[j]),
        });
      }
    }
    return orderedPairs.sort((a, b) => a.dist - b.dist);
  }

  private toNums(line: string) {
    return line.split(",").map(Number);
  }
  private distanceBetween(line1: string, line2: string) {
    const [x1, y1, z1] = this.toNums(line1);
    const [x2, y2, z2] = this.toNums(line2);
    return Math.sqrt(
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)
    );
  }
}
