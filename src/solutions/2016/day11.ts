import type { Solution } from "../../common/index.ts";

/**
 * V2 Improvements:
 * - If 2 items of the same type can be brought up, don't try bringing up only 1
 * - If there are no items bellow the current floor, don't try to bring a chip down
 * - If there are matching chips and generators on the exact same floors, only
 *   try one of the pairings
 * */

export class Day11Year2016 implements Solution {
  // Breadth first algorithm to check all possible situations until
  // the finishing point is identified. The data is stored as bit strings.
  first(_input: string): number {
    // Order is chip (lower order, to right), then generator (higher order, to left)
    // PO T PR R C
    const floors = [0b1011101111, 0b0100010000, 0b0000000000, 0b0000000000];
    return this.computeMinSteps(floors, 5);
  }

  // Do the same as part one with a more complex floor plan
  second(_input: string): number {
    // E D PO T PR R C
    const floors = [
      0b11111011101111, 0b00000100010000, 0b00000000000000, 0b00000000000000,
    ];
    return this.computeMinSteps(floors, 7);
  }

  private computeMinSteps(floors: number[], bitTypes: number): number {
    // This is the number when all chips and generators are on the same floor
    const complete = (1 << (bitTypes * 2)) - 1;
    const prevStates = new Set<string>();

    const isSafeState = (floors: number[]) => {
      for (const floor of floors) {
        let hasIncompleteChip = false;
        let hasAnyGenerator = false;
        for (let i = 0; i < bitTypes; i++) {
          const hasChip = (floor >> (i * 2)) & 1;
          const hasGenerator = (floor >> (i * 2 + 1)) & 1;
          if (hasGenerator) hasAnyGenerator = true;

          if (hasChip && !hasGenerator) {
            hasIncompleteChip = true;
          }
        }
        if (hasIncompleteChip && hasAnyGenerator) return false;
      }
      return true;
    };

    let steps = 0;
    let stack = [{ floor: 0, floors }];
    let nextStack = [];
    while (stack.length) {
      const { floor, floors } = stack.pop()!;
      const key = `${floors}|${floor}`;
      if (prevStates.has(key)) {
        if (stack.length === 0) {
          stack = nextStack;
          nextStack = [];
          steps += 1;
        }
        continue;
      }
      prevStates.add(key);

      if (floors[floors.length - 1] === complete) {
        return steps;
      }

      const lowestDuplicate = new Map<number, number>();
      for (let i = 0; i < bitTypes; i++) {
        lowestDuplicate.set(i, Infinity);
      }
      for (let i = 0; i < bitTypes; i++) {
        let chipPos = -1;
        let generatorPos = -1;
        for (let j = 0; j < floors.length; j++) {
          const hasChip = (floors[j] >> (i * 2)) & 1;
          if (hasChip) chipPos = j;
          const hasGenerator = (floors[j] >> (i * 2 + 1)) & 1;
          if (hasGenerator) generatorPos = j;
        }
        for (let j = i + 1; j < bitTypes; j++) {
          if (lowestDuplicate.get(i)! !== Infinity) continue;
          const hasSameChip = (floors[chipPos] >> (i * 2)) & 1;
          const hasSameGenerator = (floors[generatorPos] >> (i * 2 + 1)) & 1;
          if (hasSameChip && hasSameGenerator) {
            lowestDuplicate.set(j, i);
          }
        }
      }

      const isOnTopFloor = floor === floors.length - 1;

      // Try moving one chip up and its matching generator
      if (!isOnTopFloor) {
        for (let i = 0; i < bitTypes; i++) {
          const hasChip = (floors[floor] >> (i * 2)) & 1;
          const hasGenerator = (floors[floor] >> (i * 2 + 1)) & 1;
          if (hasChip && hasGenerator) {
            const newFloors = [...floors];
            newFloors[floor] &= ~(1 << (i * 2 + 1)); // Clear Generator
            newFloors[floor] &= ~(1 << (i * 2)); // Clear Chip
            newFloors[floor + 1] |= 1 << (i * 2 + 1); // Set Generator
            newFloors[floor + 1] |= 1 << (i * 2); // Set Chip
            // Always safe
            nextStack.push({ floor: floor + 1, floors: newFloors });
          }
        }
      }

      // Try moving a generator up
      if (!isOnTopFloor) {
        let hasBrought2 = false;
        const singles = [];
        for (let i = 0; i < bitTypes; i++) {
          const hasGenerator = (floors[floor] >> (i * 2 + 1)) & 1;
          if (!hasGenerator) continue;

          if (!hasBrought2 && i < lowestDuplicate.get(i)!) {
            const newFloors = [...floors];
            newFloors[floor] &= ~(1 << (i * 2 + 1)); // Clear Generator
            newFloors[floor + 1] |= 1 << (i * 2 + 1); // Set Generator
            if (isSafeState(newFloors)) {
              singles.push({ floor: floor + 1, floors: newFloors });
            }
          }

          // Try moving 2 generators up
          for (let j = i + 1; j < bitTypes; j++) {
            const hasGenerator = (floors[floor] >> (j * 2 + 1)) & 1;
            if (!hasGenerator) continue;

            const newFloors = [...floors];
            newFloors[floor] &= ~(1 << (i * 2 + 1)); // Clear Generator
            newFloors[floor + 1] |= 1 << (i * 2 + 1); // Set Generator
            newFloors[floor] &= ~(1 << (j * 2 + 1)); // Clear Generator
            newFloors[floor + 1] |= 1 << (j * 2 + 1); // Set Generator
            if (isSafeState(newFloors)) {
              hasBrought2 = true;
              nextStack.push({ floor: floor + 1, floors: newFloors });
            }
          }
        }
        if (!hasBrought2) nextStack.push(...singles);
      }

      // Try moving one chip up
      if (!isOnTopFloor) {
        let hasBrought2 = false;
        const singles = [];
        for (let i = 0; i < bitTypes; i++) {
          const hasChip = (floors[floor] >> (i * 2)) & 1;
          if (!hasChip) continue;

          if (!hasBrought2 && i < lowestDuplicate.get(i)!) {
            const newFloors = [...floors];
            newFloors[floor] &= ~(1 << (i * 2)); // Clear Chip
            newFloors[floor + 1] |= 1 << (i * 2); // Set Chip
            if (isSafeState(newFloors)) {
              singles.push({ floor: floor + 1, floors: newFloors });
            }
          }

          // Try moving 2 chips up
          for (let j = i + 1; j < bitTypes; j++) {
            const hasChip = (floors[floor] >> (j * 2)) & 1;
            if (!hasChip) continue;

            const newFloors = [...floors];
            newFloors[floor] &= ~(1 << (i * 2)); // Clear Chip
            newFloors[floor + 1] |= 1 << (i * 2); // Set Chip
            newFloors[floor] &= ~(1 << (j * 2)); // Clear Chip
            newFloors[floor + 1] |= 1 << (j * 2); // Set Chip
            if (isSafeState(newFloors)) {
              hasBrought2 = true;
              nextStack.push({ floor: floor + 1, floors: newFloors });
            }
          }
        }
        if (!hasBrought2) nextStack.push(...singles);
      }

      // Try moving a chip down
      if (floor !== 0) {
        let allFloorsBellowEmpty = true;
        for (let i = 0; i < floor; i++) {
          if (floors[i] !== 0) {
            allFloorsBellowEmpty = false;
            break;
          }
        }
        if (!allFloorsBellowEmpty) {
          for (let i = 0; i < bitTypes; i++) {
            const hasChip = (floors[floor] >> (i * 2)) & 1;
            if (!hasChip) continue;

            const newFloors = [...floors];
            newFloors[floor] &= ~(1 << (i * 2)); // Clear Chip
            newFloors[floor - 1] |= 1 << (i * 2); // Set Chip
            if (isSafeState(newFloors)) {
              nextStack.push({ floor: floor - 1, floors: newFloors });
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
