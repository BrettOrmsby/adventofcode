import type { Solution } from "../../common/index.ts";

export class Day12Year2015 implements Solution {
  // Match out and sum all numbers
  first(input: string): number {
    return input
      .matchAll(/-?\d+/g)
      .reduce((sum, match) => sum + Number(match[0]), 0);
  }

  // Traverse the parsed object and ignore objects with a red value
  second(input: string): number {
    let sum = 0;
    const traverse = (obj: object | number | string) => {
      if (typeof obj === "object") {
        if (Array.isArray(obj)) {
          for (const element of obj) {
            traverse(element);
          }
        } else {
          const values = Object.values(obj);
          if (values.includes("red")) return;
          for (const value of values) {
            traverse(value);
          }
        }
      } else if (typeof obj === "number") {
        sum += obj;
      }
    };

    const obj = JSON.parse(input);
    traverse(obj);
    return sum;
  }
}
