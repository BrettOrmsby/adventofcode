import type { Solution } from "../../common/index.ts";

/**
 * * V3 Improvements:
 * - Move from bits strings for each floor to an array of items with their floor locations
 * - This allows the items to be sorted so duplicate states where different items are on
 *   the exact same levels don't both add to the stack
 *
 * V2 Improvements:
 * - If 2 items of the same type can be brought up, don't try bringing up only 1
 * - If there are no items bellow the current floor, don't try to bring a chip down
 * - If there are matching chips and generators on the exact same floors, only
 *   try one of the pairings
 * */

interface Item {
  generator: number;
  chip: number;
}

export class Day11Year2016 implements Solution {
  // Breadth first algorithm to check all possible situations until
  // the finishing point is identified. The data is stored as the floor locations
  // of each item (including the chip and generator).
  first(_input: string): number {
    const items: Item[] = [
      { generator: 0, chip: 1 },
      { generator: 0, chip: 0 },
      { generator: 0, chip: 1 },
      { generator: 0, chip: 0 },
      { generator: 0, chip: 0 },
    ];
    return this.computeMinSteps(items);
  }

  // Do the same as part one with a more complex floor plan
  second(_input: string): number {
    const items: Item[] = [
      { generator: 0, chip: 0 }, // New
      { generator: 0, chip: 0 }, // New
      { generator: 0, chip: 1 },
      { generator: 0, chip: 0 },
      { generator: 0, chip: 1 },
      { generator: 0, chip: 0 },
      { generator: 0, chip: 0 },
    ];
    return this.computeMinSteps(items);
  }

  private computeMinSteps(items: Item[]): number {
    const FLOORS = 4;
    const prevStates = new Set<string>();

    const isSafeState = (items: Item[]) => {
      const hasIncompleteChipArr = new Array(FLOORS).fill(false);
      const hasAnyGeneratorArr = new Array(FLOORS).fill(false);

      for (const { generator, chip } of items) {
        if (generator !== chip) {
          hasIncompleteChipArr[chip] = true;
          hasAnyGeneratorArr[generator] = true;
        }
      }
      for (let i = 0; i < FLOORS; i++) {
        if (hasAnyGeneratorArr[i] && hasIncompleteChipArr[i]) return false;
      }
      return true;
    };

    let steps = 0;
    let stack = [{ floor: 0, items }];
    let nextStack: typeof stack = [];
    while (stack.length) {
      const { floor, items } = stack.pop()!;
      const sortedItems = items.sort(
        (a, b) => a.generator - b.generator || a.chip - b.chip,
      );
      const key = `${JSON.stringify(sortedItems)}|${floor}`;
      if (prevStates.has(key)) {
        if (stack.length === 0) {
          stack = nextStack;
          nextStack = [];
          steps += 1;
        }
        continue;
      }
      prevStates.add(key);

      const isComplete = items.every(
        ({ generator, chip }) =>
          generator === FLOORS - 1 && chip === FLOORS - 1,
      );
      if (isComplete) {
        return steps;
      }

      const isOnTopFloor = floor === FLOORS - 1;

      // Try moving one chip up and its matching generator
      if (!isOnTopFloor) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].generator === floor && items[i].chip === floor) {
            const newItems = [...items.map((element) => ({ ...element }))];
            newItems[i].generator = floor + 1;
            newItems[i].chip = floor + 1;
            // Always safe
            nextStack.push({ floor: floor + 1, items: newItems });
          }
        }
      }

      // Try moving a generator up
      if (!isOnTopFloor) {
        let hasBrought2 = false;
        const singles = [];
        for (let i = 0; i < items.length; i++) {
          const hasGenerator = items[i].generator === floor;
          if (!hasGenerator) continue;

          if (!hasBrought2) {
            const newItems = [...items.map((element) => ({ ...element }))];
            newItems[i].generator = floor + 1;
            if (isSafeState(newItems)) {
              singles.push({ floor: floor + 1, items: newItems });
            }
          }

          // Try moving 2 generators up
          for (let j = i + 1; j < items.length; j++) {
            const hasGenerator = items[j].generator === floor;
            if (!hasGenerator) continue;
            const newItems = [...items.map((element) => ({ ...element }))];
            newItems[i].generator = floor + 1;
            newItems[j].generator = floor + 1;
            if (isSafeState(newItems)) {
              hasBrought2 = true;
              nextStack.push({ floor: floor + 1, items: newItems });
            }
          }
        }
        if (!hasBrought2) nextStack.push(...singles);
      }

      // Try moving one chip up
      if (!isOnTopFloor) {
        let hasBrought2 = false;
        const singles = [];
        for (let i = 0; i < items.length; i++) {
          const hasChip = items[i].chip === floor;
          if (!hasChip) continue;

          if (!hasBrought2) {
            const newItems = [...items.map((element) => ({ ...element }))];
            newItems[i].chip = floor + 1;
            if (isSafeState(newItems)) {
              singles.push({ floor: floor + 1, items: newItems });
            }
          }

          // Try moving 2 chips up
          for (let j = i + 1; j < items.length; j++) {
            const hasChip = items[j].chip === floor;
            if (!hasChip) continue;
            const newItems = [...items.map((element) => ({ ...element }))];
            newItems[i].chip = floor + 1;
            newItems[j].chip = floor + 1;
            if (isSafeState(newItems)) {
              hasBrought2 = true;
              nextStack.push({ floor: floor + 1, items: newItems });
            }
          }
        }
        if (!hasBrought2) nextStack.push(...singles);
      }

      // Try moving a chip down
      if (floor !== 0) {
        const allFloorsBellowEmpty = items.every(
          ({ generator, chip }) => generator >= floor && chip >= floor,
        );
        if (!allFloorsBellowEmpty) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].generator === floor && items[i].chip === floor) {
              const newItems = [...items.map((element) => ({ ...element }))];
              newItems[i].chip = floor - 1;
              if (isSafeState(newItems)) {
                nextStack.push({ floor: floor - 1, items: newItems });
              }
            }
          }
        }
      }

      if (stack.length === 0) {
        stack = nextStack;
        nextStack = [];
        steps += 1;
      }
    }
    return -1;
  }
}
