import type { Solution } from "../../common/index.ts";

export class Day06Year2016 implements Solution {
  // Go through each vertical column and count the occurrences of
  // each letter (like in day 4). Then loop through the the characters
  // to find the max occurrence.
  first(input: string): string {
    const lines = input.split("\n");
    let output = "";
    for (let i = 0; i < lines[0].length; i++) {
      const characterCounts = new Map<string, number>();
      for (const line of lines) {
        const character = line[i];
        characterCounts.set(
          character,
          1 + (characterCounts.get(character) ?? 0),
        );
      }

      const maxEntry = characterCounts
        .entries()
        .reduce((prev, curr) => (curr[1] > prev[1] ? curr : prev), ["", -1]);
      output += maxEntry[0];
    }
    return output;
  }

  // Do the same as part 1, but instead find the minimum occurrence
  second(input: string): string {
    const lines = input.split("\n");
    let output = "";
    for (let i = 0; i < lines[0].length; i++) {
      const characterCounts = new Map<string, number>();
      for (const line of lines) {
        const character = line[i];
        characterCounts.set(
          character,
          1 + (characterCounts.get(character) ?? 0),
        );
      }

      const minEntry = characterCounts
        .entries()
        .reduce(
          (prev, curr) => (curr[1] < prev[1] ? curr : prev),
          ["", Infinity],
        );
      output += minEntry[0];
    }
    return output;
  }
}
