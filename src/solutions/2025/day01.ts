import type { Solution } from "../../common/index.ts";

export class Day01Year2025 implements Solution {
  first(input: string): number {
    let password = 0;
    let pointing = 50;
    for (const line of input.split("\n")) {
      const directionMagnitude = line.startsWith("L") ? -1 : 1;
      const turnAmount = Number(line.slice(1));
      pointing = (pointing + directionMagnitude * turnAmount) % 100;
      if (pointing < 0) pointing += 100;
      if (pointing == 0) password += 1;
    }
    return password;
  }

  second(input: string): number {
    let password = 0;
    let pointing = 50;
    for (const line of input.split("\n")) {
      const directionMagnitude = line.startsWith("L") ? -1 : 1;
      let turnAmount = Number(line.slice(1));
      while (turnAmount > 0) {
        pointing += directionMagnitude;
        if (pointing < 0) pointing = 99;
        if (pointing > 99) pointing = 0;
        if (pointing == 0) password += 1;
        turnAmount -= 1;
      }
    }
    return password;
  }
}
