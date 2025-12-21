import type { Solution } from "../../common/index.ts";

type SueKey =
  | "children"
  | "cats"
  | "samoyeds"
  | "pomeranians"
  | "akitas"
  | "vizslas"
  | "goldfish"
  | "trees"
  | "cars"
  | "perfumes";

type Sue = Partial<Record<SueKey, number>>;

export class Day16Year2015 implements Solution {
  private sue: Sue = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  // Loop through all sues to find one that matches the demographic
  first(input: string): number {
    const sues = this.parseData(input);
    const sueKeys = Object.keys(this.sue) as SueKey[];
    return (
      1 +
      sues.findIndex((sue) => {
        for (const key of sueKeys) {
          if (key in sue && sue[key] !== this.sue[key]) {
            return false;
          }
        }
        return true;
      })
    );
  }

  // Loop through all sues to find one that matches the demographic
  second(input: string): number {
    const sues = this.parseData(input);
    return (
      1 +
      sues.findIndex((sue) => {
        for (const key in this.sue) {
          if (key in sue) {
            if (["trees", "cats"].includes(key)) {
              if (sue[key as SueKey]! <= this.sue[key as SueKey]!) return false;
            } else if (["pomeranians", "goldfish"].includes(key)) {
              if (sue[key as SueKey]! >= this.sue[key as SueKey]!) return false;
            } else if (sue[key as SueKey] !== this.sue[key as SueKey])
              return false;
          }
        }
        return true;
      })
    );
  }

  private parseData(input: string): Sue[] {
    return input.split("\n").map((line) => {
      return Object.fromEntries(
        line
          .matchAll(/(\w+): (\d+)/g)
          .map((match) => [match[1], Number(match[2])])
      );
    });
  }
}
