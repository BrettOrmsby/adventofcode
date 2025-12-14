import type { Solution } from "../../common/index.ts";

export class Day12Year2025 implements Solution {
  first(input: string): number {
    const data = input;
    const regions = [...data.matchAll(/^(\d+)x(\d+): ([\d ]+)$/gm)].map(
      (match) => ({
        width: parseInt(match[1]),
        height: parseInt(match[2]),
        quantity: match[3].split(" ").map(Number),
      })
    );
    let numberFitting = 0;
    for (const region of regions) {
      const sum = region.quantity.reduce((prev, curr) => prev + curr, 0);
      const number3Blocks =
        Math.floor(region.height / 3) * Math.floor(region.width / 3);
      if (number3Blocks >= sum) numberFitting += 1;
    }
    return numberFitting;
  }

  second(_input: string): number {
    return 1;
  }
}
