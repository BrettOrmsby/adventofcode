import type { Solution } from "../../common/index.ts";

export class Day07Year2016 implements Solution {
  // Loop through all lines and use regex to check if it has
  // the pattern abba but not within `[]` using backreferences
  first(input: string): number {
    const passRegex = /(\w)((?!\1).)\2\1/;
    const failRegex = /\[[^\]]*(\w)((?!\1).)\2\1[^\]]*\]/;
    let matchingCount = 0;
    for (const line of input.split("\n")) {
      if (passRegex.test(line) && !failRegex.test(line)) {
        matchingCount += 1;
      }
    }
    return matchingCount;
  }

  // Loop through all lines, then each character in a line looking for
  // the pattern aba. If the aba pattern is found outside square brackets, add ab to
  // the aba set. If the bab pattern is found inside square brackets add ab to the bab
  // set. A line has SSL support if the sets have any intersecting elements.
  second(input: string): number {
    let matchingCount = 0;
    for (const line of input.split("\n")) {
      const aba = new Set();
      const bab = new Set();
      let isInSection = false;
      for (let i = 0; i < line.length - 2; i++) {
        if (line[i] === "[") {
          isInSection = true;
          continue;
        }
        if (line[i] === "]") {
          isInSection = false;
          continue;
        }
        if (
          line[i] === line[i + 2] &&
          line[i] !== line[i + 1]
          // && line[i + 1] !== "["
          // && line[i + 1] !== "]"
        ) {
          if (isInSection) {
            bab.add(line[i + 1] + line[i]);
          } else {
            aba.add(line[i] + line[i + 1]);
          }
        }
      }
      if (aba.intersection(bab).size) {
        matchingCount += 1;
      }
    }
    return matchingCount;
  }

  // This is an alternate solution for part 2 with regex: (within the line loop)
  //   const abaRegex = /([a-z])(?!\1)(?=([a-z])\1)(?![^\[]*\])/g;
  //   const isSSL = line.matchAll(abaRegex).find((match) => {
  //     const babRegex = new RegExp(
  //       "\\[[^\\]]*" + match[2] + match[1] + match[2] + "[^\\]]*\\]",
  //     );
  //     return babRegex.test(line);
  //   });
  //   if(isSSL) matchingCount += 1;
}
