import type { Solution } from "../../common/index.ts";

// This solution started as a brute force loop with checking for all divisors in the range 1...houseNumber/2 (~6minutes)
// Then was modified to brute force devisors in the rage 1...SQRT(houseNumber) and add both matching divisors (~1.2sec)
// And now it is modified to follow this solution (https://www.reddit.com/r/adventofcode/comments/3xjpp2/comment/cy59zd9/?context=3)

export class Day20Year2015 implements Solution {
  // Repeat through elf numbers and fill an array of houses with that amount
  // of presents at each stop it will take up to the minPresents house number.
  // Then stop when we find a house which has the min number of presents
  first(input: string): number {
    const minPresents = Math.ceil(parseInt(input) / 10);
    const housePresents = new Array(minPresents + 1).fill(0);
    for (let i = 1; i < minPresents; i++) {
      for (let j = i; j < minPresents; j += i) {
        housePresents[j] += i;
      }
      if (housePresents[i] >= minPresents) return i;
    }
    return -1;
  }

  // Do the same thing as part 1, but each elf only places the first 50 presents
  second(input: string): number {
    const minPresents = Math.ceil(parseInt(input) / 11);
    const housePresents = new Array(minPresents + 1).fill(0);
    for (let i = 1; i < minPresents; i++) {
      const maxHouse = Math.min(i * 50, minPresents);
      for (let j = i; j <= maxHouse; j += i) {
        housePresents[j] += i;
      }
      if (housePresents[i] >= minPresents) return i;
    }
    return -1;
  }
}
