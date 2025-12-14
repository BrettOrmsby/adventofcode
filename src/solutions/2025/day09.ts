import type { Solution } from "../../common/index.ts";

export class Day09Year2025 implements Solution {
  first(input: string): number {
    const data = input.split("\n").map((line) => line.split(",").map(Number));

    let maxArea = 0;
    for (let i = 0; i < data.length - 1; i++) {
      const [x1, y1] = data[i];
      for (let j = 0; j < data.length; j++) {
        const [x2, y2] = data[j];
        const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
        if (area > maxArea) {
          maxArea = area;
        }
      }
    }
    return maxArea;
  }

  second(input: string): number {
    const data = input.split("\n").map((line) => line.split(",").map(Number));

    const isViable = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): boolean => {
      // TODO: here is where I failed
      for (let i = 0; i < data.length; i++) {
        const p1 = data[i];
        const p2 = data[(i + 1) % data.length];
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
        if (overlap(p1[1], p2[1], y1, y2) && overlap(p1[0], p2[0], x1, x2))
          return false;
      }
      return true;
    };

    // Need to find a way to ensure the box of any two corners has all the things within filled
    let maxArea = 0;
    for (let i = 0; i < data.length - 1; i++) {
      const [x1, y1] = data[i];
      for (let j = 0; j < data.length; j++) {
        const [x2, y2] = data[j];
        const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
        if (area > maxArea) {
          if (isViable(x1, y1, x2, y2)) {
            console.log(x1, y1, x2, y2);
            maxArea = area;
          }
        }
      }
    }

    return maxArea;
  }
}
