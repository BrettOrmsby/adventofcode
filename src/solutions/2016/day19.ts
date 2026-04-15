import type { Solution } from "../../common/index.ts";

interface Node {
  elf: number;
  next: Node;
}

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

  // Maintain a linked list of elves, and keep a reference to the node before
  // the middle node (which will be removed). Then keep looping and removing
  // the middle node until there is only one remaining.
  second(input: string): number {
    const numberElves = parseInt(input);
    const start: Node = {
      elf: 1,
      next: null as unknown as Node,
    };
    let prevMiddle: Node = start;

    let prev = start;
    for (let i = 2; i <= numberElves; i++) {
      prev.next = {
        elf: i,
        next: start,
      };
      prev = prev.next;

      if (Math.floor(numberElves / 2) === i) {
        prevMiddle = prev;
      }
    }

    for (
      let elvesRemaining = numberElves;
      elvesRemaining > 1;
      elvesRemaining--
    ) {
      prevMiddle.next = prevMiddle.next.next;
      if (elvesRemaining % 2 === 1) {
        prevMiddle = prevMiddle.next;
      }
    }

    return prevMiddle.elf;
  }
}
