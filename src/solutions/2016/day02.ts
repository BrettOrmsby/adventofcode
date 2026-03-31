import type { Solution } from "../../common/index.ts";

export class Day02Year2016 implements Solution {
  // Repeat through all lines and update the position coordinates for each
  // instruction, remaining between 0 and 2. Then join the buttons at
  //  the final position of each line.
  first(input: string): string {
    const buttons = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    let x = 1;
    let y = 1;

    const code = input
      .split("\n")
      .map((line) => {
        for (const instruction of line.split("")) {
          switch (instruction) {
            case "U":
              y = Math.max(0, y - 1);
              break;
            case "D":
              y = Math.min(2, y + 1);
              break;
            case "L":
              x = Math.max(0, x - 1);
              break;
            case "R":
              x = Math.min(2, x + 1);
              break;
          }
        }
        return buttons[y][x];
      })
      .join("");
    return code;
  }

  // Loop through all lines and try to update the position for each instruction
  // unless it produces an undefined result. Then join the final buttons for each line.
  second(input: string): string {
    const buttons = [
      [undefined, undefined, 1, undefined, undefined],
      [undefined, 2, 3, 4, undefined],
      [5, 6, 7, 8, 9],
      [undefined, "A", "B", "C", undefined],
      [undefined, undefined, "D", undefined, undefined],
    ];
    let x = 0;
    let y = 2;

    const code = input
      .split("\n")
      .map((line) => {
        for (const instruction of line.split("")) {
          let newX = x;
          let newY = y;
          switch (instruction) {
            case "U":
              newY -= 1;
              break;
            case "D":
              newY += 1;
              break;
            case "L":
              newX -= 1;
              break;
            case "R":
              newX += 1;
              break;
          }
          if (buttons[newY]?.[newX] !== undefined) {
            y = newY;
            x = newX;
          }
        }
        return buttons[y][x];
      })
      .join("");
    return code;
  }
}
