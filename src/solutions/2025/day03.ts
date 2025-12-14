import type { Solution } from "../../common/index.ts";

export class Day03Year2025 implements Solution {
  first(input: string): number {
    const result = input
      .split("\n")
      .map((line) => {
        const sequence = line.split("").map((number) => parseInt(number));

        let firstDigit = 0;
        let secondDigit = 0;
        for (let i = 0; i < sequence.length; i++) {
          if (sequence[i] > firstDigit && i != sequence.length - 1) {
            firstDigit = sequence[i];
            secondDigit = 0;
          } else if (sequence[i] > secondDigit) {
            secondDigit = sequence[i];
          }
        }
        return firstDigit * 10 + secondDigit;
      })
      .reduce((prev, curr) => prev + curr, 0);
    return result;
  }

  second(input: string): number {
    const result = input
      .split("\n")
      .map((line) => {
        const sequence = line.split("");
        const maxNumber = new Array(12).fill(0);

        for (let i = 0; i < sequence.length; i++) {
          // for the last 12 values we can no longer change the first few digits in the max number
          let startIndexCompare = 0;
          if (sequence.length - i < 12) {
            startIndexCompare = 12 - (sequence.length - i);
          }

          let hasSwapped = false;
          for (let j = startIndexCompare; j < 12; j++) {
            if (hasSwapped) maxNumber[j] = 0;
            else if (maxNumber[j] < sequence[i]) {
              maxNumber[j] = sequence[i];
              hasSwapped = true;
            }
          }
        }
        return parseInt(maxNumber.join(""));
      })
      .reduce((prev, curr) => prev + curr, 0);
    return result;
  }
}
