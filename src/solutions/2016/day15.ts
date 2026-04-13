import type { Solution } from "../../common/index.ts";

interface Disc {
  positions: number;
  startPos: number;
}

export class Day15Year2016 implements Solution {
  // Brute force loop until the index results in all discs
  // at index 0
  first(input: string): number {
    const discs = this.parseData(input);
    return this.getFirstTime(discs);
  }

  // Do the same as part 1, but with another disc
  second(input: string): number {
    const discs = this.parseData(input);
    discs.push({ startPos: 0, positions: 11 });
    return this.getFirstTime(discs);
  }

  private getFirstTime(discs: Disc[]): number {
    let i = 0;
    const predicate = (disc: Disc, index: number) =>
      (disc.startPos + i + index) % disc.positions === 0;
    while (!discs.every(predicate)) i++;

    return i - 1; // Since it takes a second to drop
  }

  private parseData(input: string): Disc[] {
    return input.split("\n").map((line) => {
      const [_, positions, startPos] = line.match(
        /has (\d+) positions; at time=0, it is at position (\d+)./,
      )!;
      return {
        positions: parseInt(positions),
        startPos: parseInt(startPos),
      };
    });
  }
}
