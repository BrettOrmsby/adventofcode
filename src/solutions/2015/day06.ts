import type { Solution } from "../../common/index.ts";

interface Point {
  x: number;
  y: number;
}
interface Action {
  action: "turn off" | "turn on" | "toggle";
  from: Point;
  to: Point;
}
export class Day06Year2015 implements Solution {
  // Create a 2D array and initialize all elements to false. Then
  // run each line action on the range of cells in the grid.
  first(input: string): number {
    const size = 1000;
    const grid = new Array(size);
    for (let i = 0; i < size; i++) {
      grid[i] = new Array(size).fill(false);
    }

    for (const action of this.parseInput(input)) {
      for (let y = action.from.y; y <= action.to.y; y++) {
        for (let x = action.from.x; x <= action.to.x; x++) {
          switch (action.action) {
            case "toggle":
              grid[y][x] = !grid[y][x];
              break;
            case "turn off":
              grid[y][x] = false;
              break;
            case "turn on":
              grid[y][x] = true;
              break;
          }
        }
      }
    }

    return grid.flat().reduce((sum, bool) => (bool ? sum + 1 : sum), 0);
  }

  // Modify the first part by using a grid of numbers initialized to 0
  second(input: string): number {
    const size = 1000;
    const grid = new Array(size);
    for (let i = 0; i < size; i++) {
      grid[i] = new Array(size).fill(0);
    }

    for (const action of this.parseInput(input)) {
      for (let y = action.from.y; y <= action.to.y; y++) {
        for (let x = action.from.x; x <= action.to.x; x++) {
          switch (action.action) {
            case "toggle":
              grid[y][x] += 2;
              break;
            case "turn off":
              grid[y][x] = Math.max(0, grid[y][x] - 1);
              break;
            case "turn on":
              grid[y][x] += 1;
              break;
          }
        }
      }
    }

    return grid.flat().reduce((sum, num) => sum + num, 0);
  }

  private parseInput(input: string): Iterable<Action> {
    return input
      .matchAll(/^(turn off|turn on|toggle) (\d+),(\d+) through (\d+),(\d+)/gm)
      .map((match) => ({
        action: match[1] as Action["action"],
        from: { x: Number(match[2]), y: Number(match[3]) },
        to: { x: Number(match[4]), y: Number(match[5]) },
      }));
  }
}
