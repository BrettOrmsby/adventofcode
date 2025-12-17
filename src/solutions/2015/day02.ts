import type { Solution } from "../../common/index.ts";

interface Size {
  l: number;
  w: number;
  h: number;
}
export class Day02Year2015 implements Solution {
  // Read sizes line by line and sum the basic calculations
  first(input: string): number {
    return input.split("\n").reduce((sum, curr) => {
      const { l, w, h } = this.readLine(curr);
      const minExtra = Math.min(l * w, l * h, w * h);
      return sum + minExtra + 2 * (l * w + l * h + w * h);
    }, 0);
  }

  // Read sizes line by line and sum the basic calculations
  second(input: string): number {
    return input.split("\n").reduce((sum, curr) => {
      const { l, w, h } = this.readLine(curr);
      const minRibbonWrap = 2 * Math.min(l + w, l + h, w + h);
      return sum + minRibbonWrap + l * w * h;
    }, 0);
  }

  private readLine(line: string): Size {
    const [_, l, w, h] = line.match(/^(\d+)x(\d+)x(\d+)$/)!;
    return { l: Number(l), w: Number(w), h: Number(h) };
  }
}
