import type { Solution } from "../../common/index.ts";

export class Day09Year2025 implements Solution {
  // Get all distinct pairs of red tiles compare their areas
  first(input: string): number {
    const data = input.split("\n").map((line) => line.split(",").map(Number));

    let maxArea = 0;
    for (let i = 0; i < data.length - 1; i++) {
      const [x1, y1] = data[i];
      for (let j = 0; j < data.length; j++) {
        const [x2, y2] = data[j];
        const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
        maxArea = Math.max(area, maxArea);
      }
    }
    return maxArea;
  }

  // I needed some help on this one. This solution abuses the input by doing the same as
  // part 1, but only counting rectangles that are not intersected by any edge.
  second(input: string): number {
    const data = input.split("\n").map((line) => line.split(",").map(Number));

    // Determines if a rectangle is fully inside the red and green tiles
    const isViable = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): boolean => {
      for (let i = 0; i < data.length; i++) {
        const start = data[i];
        const end = data[(i + 1) % data.length];
        const overlap = (
          aStart: number,
          aEnd: number,
          bStart: number,
          bEnd: number
        ) =>
          // If a start and end are not both less than b start and end
          !(
            aStart <= bStart &&
            aStart <= bEnd &&
            aEnd <= bStart &&
            aEnd <= bEnd
          ) &&
          // If a start and end are not both greater than b start and end
          !(
            aStart >= bStart &&
            aStart >= bEnd &&
            aEnd >= bStart &&
            aEnd >= bEnd
          );
        if (
          overlap(start[1], end[1], y1, y2) &&
          overlap(start[0], end[0], x1, x2)
        )
          return false;
      }
      return true;
    };

    let maxArea = 0;
    for (let i = 0; i < data.length - 1; i++) {
      const [x1, y1] = data[i];
      for (let j = 0; j < data.length; j++) {
        const [x2, y2] = data[j];
        const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
        if (area > maxArea) {
          if (isViable(x1, y1, x2, y2)) {
            maxArea = area;
          }
        }
      }
    }

    return maxArea;
  }
}
