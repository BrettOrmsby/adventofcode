import type { Solution } from "../../common/index.ts";

export class Day03Year2016 implements Solution {
  // Test each triangle with the equation and count the passing triangles
  first(input: string): number {
    let sumTriangles = 0;
    for (const line of input.split("\n")) {
      const [a, b, c] = line.matchAll(/\d+/g).map((val) => parseInt(val[0]));
      if (a + b > c && a + c > b && b + c > a) {
        sumTriangles += 1;
      }
    }
    return sumTriangles;
  }

  // Use a similar test as part 1, but instead go by groups of 3 triangles
  // at a time (3 rows) and test each column of numbers before going to the next
  // set of 3 triangles.
  second(input: string): number {
    let sumTriangles = 0;
    const lines = input.split("\n");
    for (let i = 0; i < lines.length; i += 3) {
      const grid = lines
        .slice(i, i + 3)
        .map((line) =>
          [...line.matchAll(/\d+/g)].map((val) => parseInt(val[0])),
        );
      for (let j = 0; j < 3; j++) {
        if (
          grid[0][j] + grid[1][j] > grid[2][j] &&
          grid[0][j] + grid[2][j] > grid[1][j] &&
          grid[1][j] + grid[2][j] > grid[0][j]
        ) {
          sumTriangles += 1;
        }
      }
    }
    return sumTriangles;
  }
}
