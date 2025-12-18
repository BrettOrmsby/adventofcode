import type { Solution } from "../../common/index.ts";

export class Day08Year2015 implements Solution {
  // For each line, replace the escaped characters with a single character, then
  // use the lengths for the sum calculation
  first(input: string): number {
    let sum = 0;
    for (const line of input.split("\n")) {
      sum +=
        line.length -
        line.replaceAll(/\\"|\\\\|\\x[0-9a-f]{2}/g, "?").length +
        2; // for the double quotes
    }
    return sum;
  }

  // Use regex to escape the line, then use the lengths for the sum calculation
  second(input: string): number {
    let sum = 0;
    for (const line of input.split("\n")) {
      const newLine =
        '"' +
        line
          .replaceAll(/\\(?!(x[0-9a-f]{2}))/g, "\\\\")
          .replaceAll(/\\x([0-9a-f]{2})/g, "\\\\x$1")
          .replaceAll(/"/g, '\\"') +
        '"';
      sum += newLine.length - line.length;
    }
    return sum;
  }
}
