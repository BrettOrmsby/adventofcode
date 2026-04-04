import type { Solution } from "../../common/index.ts";

export class Day09Year2016 implements Solution {
  // See the decompressLength function
  first(input: string): number {
    return this.decompressLength(input);
  }

  // See the decompressLength function
  second(input: string): number {
    return this.decompressLength(input, true);
  }

  // Loop through the characters in the input keeping track of the length as it goes.
  // When it hits a "(" character, get the following count of characters and repeats,
  // then create a substring using the current position and count of characters.
  // If we are in part 1, then add the length of the substring * repeat count. Otherwise
  // get the decompressed length of the substring before multiplying it by the repeat count.
  private decompressLength(input: string, isRecursiveDecompress = false) {
    let length = 0;
    let i = 0;
    while (i < input.length) {
      if (input[i] !== "(") {
        length += 1;
        i++;
        continue;
      }

      // Currently input[i] === "("
      i++;
      let charCountStr = "";
      while (i < input.length && /\d/.test(input[i])) {
        charCountStr += input[i];
        i++;
      }
      const charCount = parseInt(charCountStr);

      // Currently input[i] === "x"
      i++;
      let repeatCountStr = "";
      while (i < input.length && /\d/.test(input[i])) {
        repeatCountStr += input[i];
        i++;
      }
      const repeatCount = parseInt(repeatCountStr);

      // Currently input[i] === ")"
      i++;
      const subStr = input.substring(i, i + charCount);
      i += charCount;

      const subStrLength = isRecursiveDecompress
        ? this.decompressLength(subStr, true)
        : subStr.length;
      length += subStrLength * repeatCount;
    }
    return length;
  }
}
