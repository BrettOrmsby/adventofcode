import type { Solution } from "../../common/index.ts";

export class Day10Year2015 implements Solution {
  // Use regex and backreferences to replace a sequence of the
  // same characters with their length followed by the character
  first(input: string): number {
    for (let i = 0; i < 40; i++) {
      input = input.replaceAll(/(\d)\1*/g, (match) => {
        return match.length + match[0];
      });
    }
    return input.length;
  }

  // Use regex and backreferences to replace a sequence of the
  // same characters with their length followed by the character
  second(input: string): number {
    for (let i = 0; i < 50; i++) {
      input = input.replaceAll(/(\d)\1*/g, (match) => {
        return match.length + match[0];
      });
    }
    return input.length;
  }
}
