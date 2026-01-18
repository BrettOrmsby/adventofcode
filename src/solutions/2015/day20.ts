import type { Solution } from "../../common/index.ts";

export class Day20Year2015 implements Solution {
  // Brute force the number of presents by looping over
  // houses and then each number from 1...SQRT(houseNumber)
  // and add both divisors, if they exist, to the present total
  first(input: string): number {
    const minPresents = parseInt(input) / 10;
    let houseNumber = 0;
    let numberPresent = 0;

    while (numberPresent < minPresents) {
      houseNumber += 1;
      numberPresent = 0;
      for (let i = 1; i * i <= houseNumber; i++) {
        if (houseNumber % i === 0) {
          numberPresent += i;
          const otherDivisor = houseNumber / i;
          if (i !== otherDivisor) {
            numberPresent += otherDivisor;
          }
        }
      }
    }
    return houseNumber;
  }

  // Do the same thing as part 1, but only add divisors where
  // houseNumber <= divisor * 50
  second(input: string): number {
    const minPresents = parseInt(input) / 11;
    let houseNumber = 0;
    let numberPresent = 0;

    while (numberPresent < minPresents) {
      houseNumber += 1;
      numberPresent = 0;

      for (let i = 1; i * i <= houseNumber; i++) {
        if (houseNumber % i === 0) {
          if (houseNumber <= i * 50) {
            numberPresent += i;
          }
          const otherDivisor = houseNumber / i;
          if (i !== otherDivisor && houseNumber <= otherDivisor * 50) {
            numberPresent += otherDivisor;
          }
        }
      }
    }
    return houseNumber;
  }
}
