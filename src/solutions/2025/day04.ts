import type { Solution } from "../../common/index.ts";

export class Day04Year2025 implements Solution {
  first(input: string): number {
    const data = input.split("\n").map((line) => line.split(""));
    const width = data[0].length;
    const height = data.length;

    let sumMovable = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let surroundCount = 0;
        if (data[y][x] == "@") {
          if (y - 1 >= 0) {
            // Top
            if (data[y - 1][x] == "@") surroundCount += 1;
            // Top left
            if (x - 1 >= 0 && data[y - 1][x - 1] == "@") surroundCount += 1;
            // Top right
            if (x + 1 < width && data[y - 1][x + 1] == "@") surroundCount += 1;
          }

          if (y + 1 < height) {
            // Bottom
            if (data[y + 1][x] == "@") surroundCount += 1;
            // Bottom left
            if (x - 1 >= 0 && data[y + 1][x - 1] == "@") surroundCount += 1;
            // Bottom right
            if (x + 1 < width && data[y + 1][x + 1] == "@") surroundCount += 1;
          }

          // Left
          if (x - 1 >= 0 && data[y][x - 1] == "@") surroundCount += 1;
          // Right
          if (x + 1 < width && data[y][x + 1] == "@") surroundCount += 1;

          if (surroundCount < 4) sumMovable += 1;
        }
      }
    }
    return sumMovable;
  }

  second(input: string): number {
    const data = input.split("\n").map((line) => line.split(""));
    const width = data[0].length;
    const height = data.length;

    let sumMovable = 0;
    while (true) {
      let iterationMovable = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let surroundCount = 0;
          if (data[y][x] == "@") {
            if (y - 1 >= 0) {
              // Top
              if (data[y - 1][x] == "@") surroundCount += 1;
              // Top left
              if (x - 1 >= 0 && data[y - 1][x - 1] == "@") surroundCount += 1;
              // Top right
              if (x + 1 < width && data[y - 1][x + 1] == "@")
                surroundCount += 1;
            }

            if (y + 1 < height) {
              // Bottom
              if (data[y + 1][x] == "@") surroundCount += 1;
              // Bottom left
              if (x - 1 >= 0 && data[y + 1][x - 1] == "@") surroundCount += 1;
              // Bottom right
              if (x + 1 < width && data[y + 1][x + 1] == "@")
                surroundCount += 1;
            }

            // Left
            if (x - 1 >= 0 && data[y][x - 1] == "@") surroundCount += 1;
            // Right
            if (x + 1 < width && data[y][x + 1] == "@") surroundCount += 1;

            if (surroundCount < 4) {
              iterationMovable += 1;
              data[y][x] = "x";
            }
          }
        }
      }
      sumMovable += iterationMovable;
      if (iterationMovable == 0) break;
    }
    return sumMovable;
  }
}
