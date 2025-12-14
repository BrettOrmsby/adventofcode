import type { Solution } from "../../common/index.ts";

export class Day02Year2025 implements Solution {
  first(input: string): number {
    let sumInvalid = 0;

    const ranges = input
      .split(",")
      .map((e) => e.split("-").map((n) => Number(n)));
    for (const [start, end] of ranges) {
      for (let i = start; i <= end; i++) {
        const strNumber = i.toString();
        const partitionSize = strNumber.length / 2;
        if (partitionSize % 1 !== 0) continue;
        if (
          strNumber.slice(0, partitionSize) === strNumber.slice(partitionSize)
        ) {
          sumInvalid += i;
        }
      }
    }
    return sumInvalid;
  }

  second(input: string): number {
    let sumInvalid = 0;

    const ranges = input
      .split(",")
      .map((e) => e.split("-").map((n) => Number(n)));

    for (const [start, end] of ranges) {
      index: for (let i = start; i <= end; i++) {
        const strNumber = i.toString();
        for (
          let partitionSize = 1;
          partitionSize < strNumber.length;
          partitionSize += 1
        ) {
          if (strNumber.length % partitionSize === 0) {
            const parts = strNumber.match(
              new RegExp(`\\d{${partitionSize}}`, "g")
            );
            if (
              parts != null &&
              parts.length > 1 &&
              parts.every((part) => part === parts[0])
            ) {
              sumInvalid += i;
              continue index;
            }
          }
        }
      }
    }
    return sumInvalid;
  }
}
