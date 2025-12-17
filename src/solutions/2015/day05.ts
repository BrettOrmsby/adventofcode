import type { Solution } from "../../common/index.ts";

export class Day05Year2015 implements Solution {
  // Test each line against regex to match the three pieces of criteria
  // and sum the results
  first(input: string): number {
    const vowelRegex = /(.*[aeiou]){3}/;
    const pairRegex = /(.)\1/;
    const invalidPairsRegex = /ab|cd|pq|xy/;
    return input.split("\n").reduce((sum, line) => {
      if (
        vowelRegex.test(line) &&
        pairRegex.test(line) &&
        !invalidPairsRegex.test(line)
      ) {
        return sum + 1;
      }
      return sum;
    }, 0);
  }

  // Test each line against regex to match the two pieces of criteria
  // and sum the results
  second(input: string): number {
    const splitRepeatRegex = /(.).\1/;
    const repeatPairRegex = /(..).*\1/;
    return input.split("\n").reduce((sum, line) => {
      if (splitRepeatRegex.test(line) && repeatPairRegex.test(line)) {
        return sum + 1;
      }
      return sum;
    }, 0);
  }
}
