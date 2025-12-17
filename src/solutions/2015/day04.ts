import type { Solution } from "../../common/index.ts";
import { hash } from "node:crypto";

export class Day04Year2015 implements Solution {
  // Brute force the hash using the node crypto hash function
  // to generate MD5 hashes
  first(input: string): number {
    let result = "";
    let i = -1;
    while (!result.startsWith("00000")) {
      i++;
      result = this.md5(input + i);
    }

    return i;
  }

  // Do the same thing as part 1, but check for 6 zeros instead
  second(input: string): number {
    let result = "";
    let i = -1;
    while (!result.startsWith("000000")) {
      i++;
      result = this.md5(input + i);
    }

    return i;
  }

  private md5(input: string) {
    return hash("MD5", input);
  }
}
