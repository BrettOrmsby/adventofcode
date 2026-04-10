import type { Solution } from "../../common/index.ts";

interface Point {
  x: number;
  y: number;
}

export class Day13Year2016 implements Solution {
  // Breadth first search of all open, non-wall locations surrounding
  // the current position until position (31, 39) is reached. Maintain
  // a past positions set to prevent traveling back to old positions.
  first(input: string): number {
    const favourite = parseInt(input);
    const isWall = (x: number, y: number) => {
      const number = x * x + 3 * x + 2 * x * y + y + y * y + favourite;
      const ones = number
        .toString(2)
        .split("")
        .reduce((sum, char) => sum + +char, 0);
      return ones % 2 !== 0;
    };

    let stack: Point[] = [{ x: 1, y: 1 }];
    const nextStack = new Set<string>();
    let pastPositions = new Set<string>();
    let steps = 0;

    while (stack.length) {
      const { x, y } = stack.pop()!;

      if (x === 31 && y == 39) return steps;

      if (y > 0 && !isWall(x, y - 1)) {
        nextStack.add(`${x},${y - 1}`);
      }
      if (x > 0 && !isWall(x - 1, y)) {
        nextStack.add(`${x - 1},${y}`);
      }

      if (!isWall(x + 1, y)) {
        nextStack.add(`${x + 1},${y}`);
      }
      if (!isWall(x, y + 1)) {
        nextStack.add(`${x},${y + 1}`);
      }

      if (!stack.length) {
        stack = nextStack
          .difference(pastPositions)
          .entries()
          .map(([val]) => {
            const [x, y] = val.split(",");
            return { x: parseInt(x), y: parseInt(y) };
          })
          .toArray();
        pastPositions = pastPositions.union(nextStack);
        nextStack.clear();
        steps += 1;
      }
    }

    return -1;
  }

  // Do the same as part 1, but only loop through 50 sets of the stack.
  // Then the answer is just the size of the past positions set.
  second(input: string): number {
    const favourite = parseInt(input);
    const isWall = (x: number, y: number) => {
      const number = x * x + 3 * x + 2 * x * y + y + y * y + favourite;
      const ones = number
        .toString(2)
        .split("")
        .reduce((sum, char) => sum + +char, 0);
      return ones % 2 !== 0;
    };

    let stack: Point[] = [{ x: 1, y: 1 }];
    const nextStack = new Set<string>();
    let pastPositions = new Set<string>();
    let steps = 0;
    while (stack.length && steps < 50) {
      const { x, y } = stack.pop()!;

      if (y > 0 && !isWall(x, y - 1)) {
        nextStack.add(`${x},${y - 1}`);
      }
      if (x > 0 && !isWall(x - 1, y)) {
        nextStack.add(`${x - 1},${y}`);
      }
      if (!isWall(x + 1, y)) {
        nextStack.add(`${x + 1},${y}`);
      }
      if (!isWall(x, y + 1)) {
        nextStack.add(`${x},${y + 1}`);
      }

      if (!stack.length) {
        stack = nextStack
          .difference(pastPositions)
          .entries()
          .map(([val]) => {
            const [x, y] = val.split(",");
            return { x: parseInt(x), y: parseInt(y) };
          })
          .toArray();
        pastPositions = pastPositions.union(nextStack);
        nextStack.clear();
        steps += 1;
      }
    }

    return pastPositions.size;
  }
}
