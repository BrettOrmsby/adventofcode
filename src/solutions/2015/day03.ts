import type { Solution } from "../../common/index.ts";
interface Point {
  x: number;
  y: number;
}

export class Day03Year2015 implements Solution {
  // Use a set to manage duplicate houses while looping over positions
  first(input: string): number {
    const position: Point = { x: 0, y: 0 };
    const houses = new Set<string>();

    for (const char of input) {
      this.updatePosition(position, char);
      houses.add(this.pointToKey(position));
    }
    return houses.size;
  }

  // Use a set to manage duplicate houses while looping over positions,
  // alternating between Santa and the robot by the parity of the loop counter
  second(input: string): number {
    const santaPos: Point = { x: 0, y: 0 };
    const robotPos: Point = { x: 0, y: 0 };
    const houses = new Set<string>();
    houses.add(this.pointToKey(santaPos));

    for (let i = 0; i < input.length; i++) {
      const pointReference = i % 2 === 0 ? santaPos : robotPos;
      this.updatePosition(pointReference, input[i]);
      houses.add(this.pointToKey(pointReference));
    }
    return houses.size;
  }

  private pointToKey(p: Point): string {
    return `${p.x},${p.y}`;
  }

  private updatePosition(point: Point, char: string) {
    switch (char) {
      case "^":
        point.y += 1;
        break;
      case "v":
        point.y -= 1;
        break;
      case ">":
        point.x += 1;
        break;
      case "<":
        point.x -= 1;
        break;
    }
  }
}
