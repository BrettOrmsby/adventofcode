import type { Solution } from "../../common/index.ts";

interface Instruction {
  direction: "R" | "L";
  distance: number;
}

export class Day01Year2016 implements Solution {
  // Loop through positions using an array of direction offsets and adding the distances
  // to the x and y components scaled to the direction
  first(input: string): number {
    const data = this.parseInput(input);

    let x = 0;
    let y = 0;
    // Directions are [x, y] components: [North, East, South, West]
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    const numberDirections = directions.length;
    let directionID = 0;

    for (const { direction, distance } of data) {
      if (direction === "L") {
        if (directionID == 0) {
          directionID = numberDirections - 1;
        } else {
          directionID = (directionID - 1) % numberDirections;
        }
      } else {
        directionID = (directionID + 1) % numberDirections;
      }

      x += distance * directions[directionID][0];
      y += distance * directions[directionID][1];
    }

    return Math.abs(x) + Math.abs(y);
  }

  // Do the same looping and scaling as part 1, but for unit of the distance, check if
  // the position is in the visited set, or else add it to the set
  second(input: string): number {
    const data = this.parseInput(input);

    let x = 0;
    let y = 0;

    // Directions are [x, y] components: [North, East, South, West]
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    const numberDirections = directions.length;
    let directionID = 0;

    const visited = new Set<string>();

    for (const { direction, distance } of data) {
      if (direction === "L") {
        if (directionID == 0) {
          directionID = numberDirections - 1;
        } else {
          directionID = (directionID - 1) % numberDirections;
        }
      } else {
        directionID = (directionID + 1) % numberDirections;
      }

      for (let i = 0; i < distance; i++) {
        x += directions[directionID][0];
        y += directions[directionID][1];

        const key = `${x}|${y}`;
        if (visited.has(key)) return Math.abs(x) + Math.abs(y);
        else visited.add(key);
      }
    }

    return -1;
  }

  private parseInput(input: string): Instruction[] {
    return input.split(", ").map((data) => {
      const direction = data.charAt(0) as "L" | "R";
      const distance = Number(data.slice(1));
      return { direction, distance };
    });
  }
}
