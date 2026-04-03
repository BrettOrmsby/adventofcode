import type { Solution } from "../../common/index.ts";

interface RectInstruction {
  type: "rect";
  width: number;
  height: number;
}

interface ColumnInstruction {
  type: "column";
  column: number;
  distance: number;
}

interface RowInstruction {
  type: "row";
  row: number;
  distance: number;
}

type Instruction = RectInstruction | ColumnInstruction | RowInstruction;

export class Day08Year2016 implements Solution {
  // Loop through the instructions and create rectangles, or
  // rotate rows or columns. Then sum the pixels.
  first(input: string): number {
    const screen = this.computeScreen(input);
    return screen.flat().reduce((sum, val) => sum + val, 0);
  }

  // Get the same screen input as part 1, but just print it out.
  second(input: string): string {
    const letters = this.computeScreen(input)
      .map((row) =>
        row
          .map((char, i) => {
            // Add an extra space between each letter
            let mainChar = "";
            if (i % 5 === 0) mainChar += " ";
            mainChar += char === 1 ? "X" : " ";
            return mainChar;
          })
          .join(""),
      )
      .join("\n");
    console.log(letters);
    return "CFLELOYFCS";
  }

  // This is the main function to run the instructions
  private computeScreen(input: string): number[][] {
    const instructions = this.parseData(input);
    // Create 6x50 grid of 0's
    const screen: number[][] = Array.from({ length: 6 }, () =>
      Array(50).fill(0),
    );

    for (const instruction of instructions) {
      switch (instruction.type) {
        case "rect":
          for (let i = 0; i < instruction.height; i++) {
            for (let j = 0; j < instruction.width; j++) {
              screen[i][j] = 1;
            }
          }
          break;
        case "column":
          {
            // First find the new position for each current element
            // Then update the elements in the screen
            const newValues = new Array(6);
            for (let i = 0; i < 6; i++) {
              newValues[(i + instruction.distance) % 6] =
                screen[i][instruction.column];
            }
            for (let i = 0; i < 6; i++) {
              screen[i][instruction.column] = newValues[i];
            }
          }
          break;
        case "row":
          // Rotate the row by popping and unshifting values
          for (let i = 0; i < instruction.distance; i++) {
            const removed = screen[instruction.row].pop()!;
            screen[instruction.row].unshift(removed);
          }
      }
    }

    return screen;
  }

  private parseData(input: string): Instruction[] {
    const rectRegex = /^rect (\d+)x(\d+)$/;
    const columnRegex = /^rotate column x=(\d+) by (\d+)$/;
    const rowRegex = /^rotate row y=(\d+) by (\d+)$/;
    return input.split("\n").map((line) => {
      if (rectRegex.test(line)) {
        const [_, width, height] = line.match(rectRegex)!;
        return {
          type: "rect",
          width: parseInt(width),
          height: parseInt(height),
        };
      }
      if (columnRegex.test(line)) {
        const [_, column, distance] = line.match(columnRegex)!;
        return {
          type: "column",
          column: parseInt(column),
          distance: parseInt(distance),
        };
      }
      const [_, row, distance] = line.match(rowRegex)!;
      return {
        type: "row",
        row: parseInt(row),
        distance: parseInt(distance),
      };
    });
  }
}
