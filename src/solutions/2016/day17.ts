import type { Solution } from "../../common/index.ts";
import { hash } from "node:crypto";

interface Position {
  x: number;
  y: number;
  path: string;
}

export class Day17Year2016 implements Solution {
  // Breadth first-like recursion to find the smallest path.
  first(input: string): string {
    let stack: Position[] = [
      {
        x: 0,
        y: 0,
        path: "",
      },
    ];
    let nextStack: Position[] = [];

    while (stack.length) {
      const { x, y, path } = stack.pop()!;
      const pathHash = this.md5(input + path);

      if (x === 3 && y == 3) return path;

      if (y > 0 && this.isOpen(pathHash[0])) {
        nextStack.push({ x, y: y - 1, path: path + "U" });
      }
      if (x > 0 && this.isOpen(pathHash[2])) {
        nextStack.push({ x: x - 1, y, path: path + "L" });
      }
      if (x < 3 && this.isOpen(pathHash[3])) {
        nextStack.push({ x: x + 1, y, path: path + "R" });
      }
      if (y < 3 && this.isOpen(pathHash[1])) {
        nextStack.push({ x, y: y + 1, path: path + "D" });
      }

      if (!stack.length) {
        stack = nextStack;
        nextStack = [];
      }
    }

    return "";
  }

  // Depth first recursion to find the largest path.
  second(input: string): number {
    let maxLength = 0;
    const stack: Position[] = [
      {
        x: 0,
        y: 0,
        path: "",
      },
    ];

    while (stack.length) {
      const { x, y, path } = stack.pop()!;
      const pathHash = this.md5(input + path);

      if (x === 3 && y == 3) {
        maxLength = Math.max(maxLength, path.length);
        continue;
      }

      if (y > 0 && this.isOpen(pathHash[0])) {
        stack.push({ x, y: y - 1, path: path + "U" });
      }
      if (x > 0 && this.isOpen(pathHash[2])) {
        stack.push({ x: x - 1, y, path: path + "L" });
      }
      if (x < 3 && this.isOpen(pathHash[3])) {
        stack.push({ x: x + 1, y, path: path + "R" });
      }
      if (y < 3 && this.isOpen(pathHash[1])) {
        stack.push({ x, y: y + 1, path: path + "D" });
      }
    }

    return maxLength;
  }

  private isOpen(char: string): boolean {
    return ["b", "c", "d", "e", "f"].includes(char);
  }

  private md5(input: string) {
    return hash("MD5", input);
  }
}
