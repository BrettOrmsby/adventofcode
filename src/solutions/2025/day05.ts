import type { Solution } from "../../common/index.ts";

interface CafeteriaData {
  ranges: number[][];
  ids: number[];
}

export class Day05Year2025 implements Solution {
  // Loop through the ids and count the ones within any range
  first(input: string): number {
    const { ids, ranges } = this.parseData(input);
    let freshCount = 0;
    for (const id of ids) {
      if (this.isFresh(id, ranges)) {
        freshCount += 1;
      }
    }
    return freshCount;
  }

  // Sort ranges by lower end, then merge connected ranges and sum the total size of the
  // merged ranges
  second(input: string): number {
    const { ranges } = this.parseData(input);
    ranges.sort((a, b) => a[0] - b[0]);

    let freshIds = 0;
    let i = 0;
    while (i < ranges.length) {
      const range = ranges[i];
      let j = i + 1;
      // While next item rage starts within range, update the range end to the max of the ends
      while (j < ranges.length && ranges[j][0] <= range[1]) {
        range[1] = Math.max(range[1], ranges[j][1]);
        // We skip over this item in the outer loop too
        i++;
        j++;
      }
      freshIds += range[1] - range[0] + 1;
      i++;
    }
    return freshIds;
  }

  private isFresh(id: number, ranges: number[][]) {
    for (const [lower, upper] of ranges) {
      if (id >= lower && id <= upper) return true;
    }
    return false;
  }

  private parseData(data: string): CafeteriaData {
    const ranges: number[][] = [];
    const ids: number[] = [];

    let isParsingIds = false;
    for (const line of data.split("\n")) {
      if (line == "") {
        isParsingIds = true;
      } else if (!isParsingIds) {
        ranges.push(line.split("-").map(Number));
      } else {
        ids.push(Number(line));
      }
    }
    return { ranges, ids };
  }
}
