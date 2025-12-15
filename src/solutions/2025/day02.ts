import type { Solution } from "../../common/index.ts";

export class Day02Year2025 implements Solution {
  // Loop through all ids in each range and split the
  // ids in half to see if the halves are the same
  first(input: string): number {
    let sumInvalid = 0;

    const ranges = input.split(",").map((line) => line.split("-").map(Number));
    for (const [start, end] of ranges) {
      for (let id = start; id <= end; id++) {
        const strNumber = id.toString();
        const partitionSize = strNumber.length / 2;
        if (partitionSize % 1 !== 0) continue; // odd sized ids can't be split in 2
        if (
          strNumber.slice(0, partitionSize) === strNumber.slice(partitionSize)
        ) {
          sumInvalid += id;
        }
      }
    }
    return sumInvalid;
  }

  // Instead of splitting the id in half, we use regex backreferences to find equal partitions
  second(input: string): number {
    let sumInvalid = 0;

    const ranges = input.split(",").map((e) => e.split("-").map(Number));
    for (const [start, end] of ranges) {
      for (let id = start; id <= end; id++) {
        const strNumber = id.toString();
        const maxPartitionSize = Math.max(Math.floor(strNumber.length / 2), 1);
        const invalidRegex = new RegExp(
          `^(\\d{1,${maxPartitionSize}})\\1+$`,
          "g"
        );
        if (invalidRegex.test(strNumber)) {
          sumInvalid += id;
        }
      }
    }
    return sumInvalid;
  }
}
