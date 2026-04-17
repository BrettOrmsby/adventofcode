import type { Solution } from "../../common/index.ts";

interface DataRow {
  x: number;
  y: number;
  size: number;
  used: number;
  avail: number;
}

interface GridState {
  goal: { x: number; y: number };
  empty: { x: number; y: number };
}

export class Day22Year2016 implements Solution {
  // Repeat through all pairs of nodes to see if they form viable
  // pairs.
  first(input: string): number {
    const data = this.parseData(input);
    let viablePairs = 0;
    for (let i = 0; i < data.length - 1; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[i].used !== 0 && data[i].used <= data[j].avail) {
          viablePairs += 1;
        }
        if (data[j].used !== 0 && data[j].used <= data[i].avail) {
          viablePairs += 1;
        }
      }
    }
    return viablePairs;
  }

  // Form the nodes into a 2D array, then do a breadth-first
  // search storing the grid state of the goal data and the singular
  // empty node. On each loop, try to transfer the data adjacent to
  // the empty node into the empty node, and update the goal data
  // location if it has moved. Memorize past states to speed the
  // process, and stop after finding a state where the goal is at (0, 0)
  second(input: string): number {
    const data = this.parseData(input);

    const grid: DataRow[][] = [];
    let emptyX = 0;
    let emptyY = 0;
    for (const item of data) {
      if (item.y >= grid.length) {
        grid.push([]);
      }
      if (item.used === 0) {
        emptyX = item.x;
        emptyY = item.y;
      }
      grid[item.y].push(item);
    }
    const goalUsed = grid[0][grid[0].length - 1].used;

    const start: GridState = {
      goal: { x: grid[0].length - 1, y: 0 },
      empty: { x: emptyX, y: emptyY },
    };
    let stack = [start];
    let nextStack: GridState[] = [];

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    let steps = 0;

    const history = new Set<string>();
    const changeToKey = (change: GridState) =>
      `${change.goal.x}|${change.goal.y}|${change.empty.x}|${change.empty.y}`;
    history.add(changeToKey(start));

    while (stack.length) {
      const gridState = stack.pop()!;
      const { empty, goal } = gridState;
      if (goal.x === 0 && goal.y === 0) break;

      for (const [xOff, yOff] of directions) {
        const ySend = empty.y + yOff;
        const xSend = empty.x + xOff;
        const isSenderGoal = ySend === goal.y && xSend === goal.x;

        if (!grid[ySend]?.[xSend]) continue; // Out of bounds

        const emptyHasSpace =
          grid[empty.y][empty.x].size >=
          (isSenderGoal ? goalUsed : grid[ySend][xSend].used);
        if (!emptyHasSpace) continue;

        const newState: GridState = {
          empty: { x: xSend, y: ySend },
          goal: isSenderGoal ? { x: empty.x, y: empty.y } : goal,
        };

        const historyState = changeToKey(newState);
        if (!history.has(historyState)) {
          nextStack.push(newState);
          history.add(historyState);
        }
      }

      if (!stack.length) {
        stack = nextStack;
        nextStack = [];
        steps += 1;
      }
    }
    return steps;
  }

  private parseData(input: string): DataRow[] {
    const lineRegex =
      /^\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%$/;
    return input
      .split("\n")
      .map((line): DataRow | null => {
        const match = line.match(lineRegex);
        if (!match) return null;
        const [_, x, y, size, used, avail] = match;
        return {
          x: parseInt(x),
          y: parseInt(y),
          size: parseInt(size),
          used: parseInt(used),
          avail: parseInt(avail),
        };
      })
      .filter((element) => element !== null);
  }
}
