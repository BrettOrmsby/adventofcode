import type { Solution } from "../../common/index.ts";
import { hash } from "node:crypto";

export class Day05Year2016 implements Solution {
  // Brute force the answer by incrementing the hash index until
  // enough password characters are found.
  first(input: string): string {
    let hashIndex = 0;
    let password = "";

    let charsFound = 0;
    while (charsFound < 8) {
      const hashValue = hash("MD5", input + hashIndex);
      if (hashValue.startsWith("00000")) {
        password += hashValue.at(5);
        charsFound++;
      }
      hashIndex += 1;
    }

    return password;
  }

  // Do the same thing as part 1, but keep an array of the password characters
  // and update the password at that location only if it is blank.
  second(input: string): string {
    const password = new Array(8).fill("");
    let hashIndex = 0;
    let charsFound = 0;

    while (charsFound < 8) {
      const hashValue = hash("MD5", input + hashIndex);
      if (hashValue.startsWith("00000")) {
        const position = parseInt(hashValue.at(5)!);
        if (position < 8 && password[position] === "") {
          password[position] = hashValue.at(6)!;
          charsFound += 1;
        }
      }
      hashIndex += 1;
    }

    return password.join("");
  }
}
