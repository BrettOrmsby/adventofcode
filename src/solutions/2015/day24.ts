import { type Solution } from "../../common/index.ts";

type Result = {
  size: number;
  product: number;
};

export class Day24Year2015 implements Solution {
  // Recursively try to pick out a group from the data that sums to 1/3 of the data.
  // Start with the largest numbers, since they will result in the smallest group size.
  // When we find one, check to see if the remaining data can be partitioned into groups too.
  // If it can be partitioned, we can possibly update the minimum size and minimum product.
  first(input: string): number {
    const data = this.parseData(input).reverse();
    const targetSize = data.reduce((a, b) => a + b, 0) / 3;

    const result: Result = {
      size: Infinity,
      product: Infinity,
    };

    this.searchForMinPackageGroup(data, targetSize, result);
    return result.product;
  }

  // Do the same as part 1, but with a new target size
  second(input: string): number {
    const data = this.parseData(input).reverse();
    const targetSize = data.reduce((a, b) => a + b, 0) / 4;

    const result: Result = {
      size: Infinity,
      product: Infinity,
    };

    this.searchForMinPackageGroup(data, targetSize, result);
    return result.product;
  }

  private parseData(input: string): number[] {
    return input.split("\n").map(Number);
  }

  // This is the recursive function to get the minimum package groups
  private searchForMinPackageGroup(
    remaining: number[],
    targetSize: number,
    result: Result,
    group: number[] = [],
    sum: number = 0,
    index: number = 0,
  ) {
    if (group.length > result.size || sum > targetSize) return;
    if (sum === targetSize) {
      if (!this.doesPartition(remaining, targetSize)) return;
      const product = group.reduce((product, num) => product * num, 1);
      if (group.length < result.size || product < result.product) {
        result.size = group.length;
        result.product = product;
      }
    }

    for (let i = index; i < remaining.length; i++) {
      const newRemaining = [...remaining];
      newRemaining.splice(i, 1);
      this.searchForMinPackageGroup(
        newRemaining,
        targetSize,
        result,
        [...group, remaining[i]],
        sum + remaining[i],
        i,
      );
    }
  }

  // This is a very similar structure, but only checks if it can be partitioned
  private doesPartition(
    remaining: number[],
    targetSize: number,
    sum: number = 0,
    index: number = 0,
  ): boolean {
    if (sum > targetSize) return false;
    if (sum === targetSize) {
      if (remaining.length === 0) return true;
      return this.doesPartition(remaining, targetSize);
    }

    for (let i = index; i < remaining.length; i++) {
      const newRemaining = [...remaining];
      newRemaining.splice(i, 1);
      const doesItPartition = this.doesPartition(
        newRemaining,
        targetSize,
        sum + remaining[i],
        i,
      );
      if (doesItPartition) return true;
    }
    return false;
  }
}
