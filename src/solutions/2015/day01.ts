import type { Solution } from "../../common/index.ts";

export class Day01Year2015 implements Solution {
  // Loop through all characters and update the level accordingly
  first(input: string): number {
    let level = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === "(") {
        level++;
      } else {
        level--;
      }
    }
    return level;
  }

  // Do the same as part 1, but whenever we travel down, check
  // if we are in the basement
  second(input: string): number {
    let level = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === "(") {
        level++;
      } else {
        level--;
        if (level < 0) return i + 1;
      }
    }
    return -1;
  }
}
