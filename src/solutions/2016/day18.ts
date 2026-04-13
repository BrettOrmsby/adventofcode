import type { Solution } from "../../common/index.ts";

export class Day18Year2016 implements Solution {
  // Keep an Uint8Array of bits for 0=safe and 1=trap. For each iteration,
  // update the next array with the new trap/safe situation based on the
  // simplified boolean condition: isTrap = left XOR right, and keep track
  // of the sum of safe spaces. Then swap the arrays.
  first(input: string): number {
    return this.getSafeTiles(input, 40);
  }

  // Do the same as part 1
  second(input: string): number {
    return this.getSafeTiles(input, 400000);
  }

  private getSafeTiles(input: string, rows: number) {
    let safeSum = 0;

    // The two edges count as safe values, and are initialized to 0
    // Traps will be 1
    let row = new Uint8Array(input.length + 2);
    for (let i = 0; i < input.length; i++) {
      if (input[i] === "^") {
        row[i + 1] = 1;
      } else {
        safeSum += 1;
      }
    }

    // Initialize the next row since it is faster than allocating a new array each loop iteration
    let nextRow = new Uint8Array(input.length + 2);
    for (let i = 0; i < rows - 1; i++) {
      for (let j = 1; j < row.length - 1; j++) {
        // Boolean logic simplifies to Left XOR Right
        const isTrap = row[j + 1] !== row[j - 1];
        nextRow[j] = isTrap ? 1 : 0;
        if (!isTrap) {
          safeSum += 1;
        }
      }

      [row, nextRow] = [nextRow, row];
    }

    return safeSum;
  }
}
