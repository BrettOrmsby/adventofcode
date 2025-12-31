import type { Solution } from "../../common/index.ts";

export class Day18Year2015 implements Solution {
  // Brute force repeat 100 times and create an updated grid of lights each time
  // based on the count of surrounding lights
  first(input: string): number {
    let lights = this.parseInput(input);
    const width = lights[0].length;
    const height = lights.length;
    const offsets = [
      [0, 1],
      [1, 0],
      [1, 1],
      [-1, -1],
      [-1, 0],
      [0, -1],
      [1, -1],
      [-1, 1],
    ];

    for (let i = 0; i < 100; i++) {
      const copy = lights.map((row) => [...row]);
      for (let j = 0; j < height; j++) {
        for (let k = 0; k < width; k++) {
          let surroundCount = 0;
          for (const [x, y] of offsets) {
            if (lights[j + y]?.[k + x]) surroundCount += 1;
          }
          if (lights[j][k]) {
            copy[j][k] = surroundCount === 2 || surroundCount === 3;
          } else {
            copy[j][k] = surroundCount === 3;
          }
        }
      }
      lights = copy;
    }
    return lights.flat().reduce((sum, isOn) => (isOn ? sum + 1 : sum), 0);
  }

  // Do the same as part 1, but ignore corner cases.
  second(input: string): number {
    let lights = this.parseInput(input);
    const width = lights[0].length;
    const height = lights.length;
    const offsets = [
      [0, 1],
      [1, 0],
      [1, 1],
      [-1, -1],
      [-1, 0],
      [0, -1],
      [1, -1],
      [-1, 1],
    ];

    for (let i = 0; i < 100; i++) {
      const copy = lights.map((row) => [...row]);
      for (let j = 0; j < height; j++) {
        for (let k = 0; k < width; k++) {
          if ((k === 0 || k === width - 1) && (j === 0 || j === height - 1)) {
            continue;
          }
          let surroundCount = 0;
          for (const [x, y] of offsets) {
            if (lights[j + y]?.[k + x]) surroundCount += 1;
          }
          if (lights[j][k]) {
            copy[j][k] = surroundCount === 2 || surroundCount === 3;
          } else {
            copy[j][k] = surroundCount === 3;
          }
        }
      }
      lights = copy;
    }
    return lights.flat().reduce((sum, isOn) => (isOn ? sum + 1 : sum), 0);
  }

  private parseInput(input: string): boolean[][] {
    return input
      .split("\n")
      .map((line) => line.split("").map((char) => char === "#"));
  }
}
