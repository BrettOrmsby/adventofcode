import { type Solution } from "../../common/index.ts";

export class Day17Year2015 implements Solution {
  // This is similar to day 15, but we basically check all powersets of the sizes.
  // Each container is either used, or not used, then the sum of the sizes must be 150
  first(input: string): number {
    const sizes = this.parseData(input);
    let combinations = 0;

    const recurse = (index: number, remaining: number) => {
      if (index === sizes.length - 1) {
        if (remaining === 0) {
          combinations += 1;
        }
        if (remaining - sizes[index] === 0) {
          combinations += 1;
        }
        return;
      }

      recurse(index + 1, remaining);
      recurse(index + 1, remaining - sizes[index]);
    };

    recurse(0, 150);
    return combinations;
  }

  // Recurse similar to part one, but keep track of the number of containers
  // used and the min combination size.
  second(input: string): number {
    const sizes = this.parseData(input);
    let combinations = 0;
    let minCombinationSize = Infinity;

    const incrementCombination = (count: number) => {
      if (count < minCombinationSize) {
        minCombinationSize = count;
        combinations = 1;
      } else if (count === minCombinationSize) {
        combinations += 1;
      }
    };

    const recurse = (index: number, remaining: number, count: number) => {
      if (count > minCombinationSize) return;
      if (index === sizes.length - 1) {
        if (remaining === 0) {
          incrementCombination(count);
        }
        if (remaining - sizes[index] === 0) {
          incrementCombination(count + 1);
        }
        return;
      }

      recurse(index + 1, remaining, count);
      recurse(index + 1, remaining - sizes[index], count + 1);
    };

    recurse(0, 150, 0);
    return combinations;
  }

  private parseData(input: string): number[] {
    return input.split("\n").map(Number);
  }
}
