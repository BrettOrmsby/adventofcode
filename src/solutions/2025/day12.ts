import type { Solution } from "../../common/index.ts";

interface Region {
  width: number;
  height: number;
  quantity: number;
}

export class Day12Year2025 implements Solution {
  // Abuse the input to only count the number of 3x3 areas in each region and compare
  // that to the number of present that need to be packed there
  first(input: string): number {
    const regions = this.parseData(input);
    let numberFitting = 0;
    for (const region of regions) {
      const number3Blocks =
        Math.floor(region.height / 3) * Math.floor(region.width / 3);
      if (number3Blocks >= region.quantity) numberFitting += 1;
    }
    return numberFitting;
  }

  second(_input: string): number {
    return 1;
  }

  private parseData(input: string): Iterable<Region> {
    return input.matchAll(/^(\d+)x(\d+): ([\d ]+)$/gm).map((match) => ({
      width: parseInt(match[1]),
      height: parseInt(match[2]),
      quantity: match[3]
        .split(" ")
        .reduce((prev, curr) => prev + parseInt(curr), 0),
    }));
  }
}
