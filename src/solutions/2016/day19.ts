import type { Solution } from "../../common/index.ts";

export class Day19Year2016 implements Solution {
  // Maintain two arrays, one for the current elves, and one for the next
  // round of elves. If there are an odd number of elves, the first elf
  // gets their presents stolen. Otherwise the next elves are every other
  // elf. Keep repeating the process until there is only one elf left.
  first(input: string): number {
    const numberElves = parseInt(input);
    let elves = new Array(numberElves);
    for (let i = 0; i < elves.length; i++) {
      elves[i] = i + 1;
    }
    let nextElves = [];

    while (elves.length > 1) {
      const start = elves.length % 2 === 0 ? 0 : 2;
      for (let i = start; i < elves.length; i += 2) {
        nextElves.push(elves[i]);
      }
      elves = nextElves;
      nextElves = [];
    }

    return elves[0];
  }

  // Repeat removing the elf across from the current elf
  // until there is only one elf left. Runs in ~7min
  second(input: string): number {
    const numberElves = parseInt(input);
    const elves = new Array(numberElves);
    for (let i = 0; i < elves.length; i++) {
      elves[i] = i + 1;
    }

    let elfTurn = 0;
    while (elves.length > 1) {
      const target = (elfTurn + Math.floor(elves.length / 2)) % elves.length;
      if (target < elfTurn) elfTurn -= 1;
      elves.splice(target, 1);
      elfTurn = (elfTurn + 1) % elves.length;
    }

    return elves[0];
  }
}
