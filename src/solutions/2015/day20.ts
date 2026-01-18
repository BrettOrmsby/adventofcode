import type { Solution } from "../../common/index.ts";

export class Day20Year2015 implements Solution {
  // Brute force the number of presents by looping over
  // each number and looking for all its divisors
  // Note: this takes around 6 minutes of running
  first(input: string): number {
    const minPresents = parseInt(input) / 10;
    let houseNumber = 0;
    let numberPresent = 0;

    while (numberPresent < minPresents) {
      houseNumber += 1;
      numberPresent = houseNumber;
      for (let i = 1; i <= houseNumber / 2; i++) {
        if (houseNumber % i === 0) {
          numberPresent += i;
        }
      }
    }
    return houseNumber;
  }

  // Brute force the same as part 1, but ignore some of the
  // lower devisors if the house number is high enough
  // Note: this takes around 6 minutes of running
  second(input: string): number {
    const minPresents = parseInt(input) / 11;
    let houseNumber = 0;
    let numberPresent = 0;

    while (numberPresent < minPresents) {
      houseNumber += 1;
      numberPresent = houseNumber;
      const start = Math.ceil(houseNumber / 50);
      for (let i = start; i <= houseNumber / 2; i++) {
        if (houseNumber % i === 0) {
          numberPresent += i;
        }
      }
    }
    return houseNumber;
  }
}
