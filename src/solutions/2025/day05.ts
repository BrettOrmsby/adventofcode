import type { Solution } from "../../common/index.ts";

export class Day05Year2025 implements Solution {
  first(input: string): number {
    const data = input;
    const { ids, ranges } = this.parseData(data);
    let freshCount = 0;
    for (const id of ids) {
      if (this.isFresh(id, ranges)) {
        freshCount += 1;
      }
    }
    return freshCount;
  }

  second(input: string): number {
    const data = input;
    const { ranges } = this.parseData(data);
    ranges.sort((a, b) => a[0] - b[0]);

    let sumRanges = 0;
    let i = 0;
    while (i < ranges.length) {
      const range = ranges[i];
      let j = i + 1;
      // While next item rage starts within range
      while (j < ranges.length && ranges[j][0] <= range[1]) {
        // If the next item range end is passed the current end, we update the current end
        if (range[1] <= ranges[j][1]) range[1] = ranges[j][1];
        i++; // We skip over this element in the loop since it was already factored in
        j++;
      }
      sumRanges += range[1] - range[0] + 1;
      i++;
    }
    return sumRanges;
  }

  private isFresh(id: number, ranges: number[][]) {
    for (const [lower, upper] of ranges) {
      if (id >= lower && id <= upper) return true;
    }
    return false;
  }

  private parseData(data: string) {
    const ranges = [];
    const ids = [];

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
