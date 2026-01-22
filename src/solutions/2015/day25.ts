import type { Solution } from "../../common/index.ts";
interface Data {
  row: number;
  col: number;
}
export class Day25Year2015 implements Solution {
  // Simple brute force the pattern until we hit the row and column
  first(input: string): number {
    const { row, col } = this.parseInput(input);
    let prev = 20151125;
    let currRow = 1;
    let currCol = 1;
    let maxRow = 1;
    while (currRow != row || currCol != col) {
      currRow -= 1;
      currCol += 1;
      if (currRow === 0) {
        currCol = 1;
        currRow = maxRow + 1;
        maxRow = currRow;
      }
      prev = (prev * 252533) % 33554393;
    }
    return prev;
  }

  second(_input: string): number {
    return -1;
  }

  private parseInput(input: string): Data {
    const [row, col] = input.matchAll(/\d+/g).map(Number);
    return {
      row,
      col,
    };
  }
}
