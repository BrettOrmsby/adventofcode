import type { Solution } from "../../common/index.ts";

interface Range {
  min: number;
  max: number;
}

// Similar problem to 2025 day 5 part 2
export class Day20Year2016 implements Solution {
  // Merge the first set of sorted ranges if they intersect or are
  // adjacent. Then the minimum IP is either 0 (if the first min is not 0)
  // or the number after the first max.
  first(input: string): number {
    const ranges = this.parseData(input);
    const sortedRanges = ranges.sort((a, b) => a.min - b.min);

    // Merge the first set of ranges
    let i = 1;
    while (
      i < ranges.length &&
      sortedRanges[i].min <= sortedRanges[0].max + 1
    ) {
      sortedRanges[0].max = Math.max(sortedRanges[0].max, sortedRanges[i].max);
      i++;
    }
    return sortedRanges[0].min === 0 ? sortedRanges[0].max + 1 : 0;
  }

  // Now, merge all sets of intersecting ranges. Then whenever a range
  // is finished, determine the number of IPs between its min and the
  // previous maximum.
  second(input: string): number {
    const ranges = this.parseData(input).sort((a, b) => a.min - b.min);

    let numberIPs = 0;
    let i = 0;
    let lastMax = 0;
    while (i < ranges.length) {
      const range = ranges[i];
      let j = i + 1;
      // Merge the intersecting ranges
      while (j < ranges.length && ranges[j].min <= range.max) {
        range.max = Math.max(range.max, ranges[j].max);
        i++;
        j++;
      }

      numberIPs += range.min - lastMax;
      lastMax = range.max + 1;
      i++;
    }
    // Deals with any remainder if the invalid ranges don't go up to
    // the max size of IPs
    if (lastMax < 4294967295) {
      numberIPs += 4294967295 - lastMax;
    }

    return numberIPs;
  }

  private parseData(input: string): Range[] {
    return input.split("\n").map((line) => {
      const [min, max] = line.split("-");
      return { min: parseInt(min), max: parseInt(max) };
    });
  }
}
