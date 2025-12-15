import type { Solution } from "../../common/index.ts";

export class Day04Year2025 implements Solution {
  // Repeat through each cell of the grid and check all surrounding
  // cells to see if there are 4 or more surrounding papers
  first(input: string): number {
    const data = input.split("\n").map((line) => line.split(""));
    const width = data[0].length;
    const height = data.length;

    let sumMovable = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[y][x] === "@") {
          const surroundCount = this.countSurroundingPaper(data, x, y);
          if (surroundCount < 4) sumMovable += 1;
        }
      }
    }
    return sumMovable;
  }

  // Repeat the procedure of part 1 in a loop until no changes are made
  second(input: string): number {
    const data = input.split("\n").map((line) => line.split(""));
    const width = data[0].length;
    const height = data.length;

    let sumMovable = 0;
    while (true) {
      let iterationMovable = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (data[y][x] == "@") {
            const surroundCount = this.countSurroundingPaper(data, x, y);
            if (surroundCount < 4) {
              iterationMovable += 1;
              data[y][x] = "x";
            }
          }
        }
      }
      sumMovable += iterationMovable;
      if (iterationMovable === 0) break;
    }
    return sumMovable;
  }

  private countSurroundingPaper(
    grid: string[][],
    x: number,
    y: number
  ): number {
    const width = grid[0].length;
    const height = grid.length;
    let surroundCount = 0;

    const isPaper = (x: number, y: number) => grid[y][x] === "@";

    if (y - 1 >= 0) {
      // Top
      if (isPaper(x, y - 1)) surroundCount += 1;
      // Top left
      if (x - 1 >= 0 && isPaper(x - 1, y - 1)) surroundCount += 1;
      // Top right
      if (x + 1 < width && isPaper(x + 1, y - 1)) surroundCount += 1;
    }

    if (y + 1 < height) {
      // Bottom
      if (isPaper(x, y + 1)) surroundCount += 1;
      // Bottom left
      if (x - 1 >= 0 && isPaper(x - 1, y + 1)) surroundCount += 1;
      // Bottom right
      if (x + 1 < width && isPaper(x + 1, y + 1)) surroundCount += 1;
    }

    // Left
    if (x - 1 >= 0 && isPaper(x - 1, y)) surroundCount += 1;
    // Right
    if (x + 1 < width && isPaper(x + 1, y)) surroundCount += 1;
    return surroundCount;
  }
}
