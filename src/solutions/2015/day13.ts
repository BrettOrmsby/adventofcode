import { Solution, permute } from "../../common/index.ts";

type SittingHappyLevels = Record<string, Record<string, number>>;
export class Day13Year2015 implements Solution {
  // Create all permutations of the table, and test each individually
  first(input: string): number {
    const happyLevels = this.parseData(input);
    let bestArrangementDiff = 0;
    for (const permutation of permute(Object.keys(happyLevels))) {
      let happiness = 0;
      for (let i = 0; i < permutation.length; i++) {
        const nextPerson = (i + 1) % permutation.length;
        const prevPerson = i === 0 ? permutation.length - 1 : i - 1;
        happiness += happyLevels[permutation[i]][permutation[nextPerson]];
        happiness += happyLevels[permutation[i]][permutation[prevPerson]];
      }
      bestArrangementDiff = Math.max(bestArrangementDiff, happiness);
    }
    return bestArrangementDiff;
  }

  // Do the same as part 1, but add a blank person to the permutations
  second(input: string): number {
    const happyLevels = this.parseData(input);

    happyLevels["you"] = {};
    for (const person of Object.keys(happyLevels)) {
      happyLevels["you"][person] = 0;
      happyLevels[person]["you"] = 0;
    }

    let bestArrangementDiff = 0;
    for (const permutation of permute(Object.keys(happyLevels))) {
      let happiness = 0;
      for (let i = 0; i < permutation.length; i++) {
        const nextPerson = (i + 1) % permutation.length;
        const prevPerson = i === 0 ? permutation.length - 1 : i - 1;
        happiness += happyLevels[permutation[i]][permutation[nextPerson]];
        happiness += happyLevels[permutation[i]][permutation[prevPerson]];
      }
      bestArrangementDiff = Math.max(bestArrangementDiff, happiness);
    }
    return bestArrangementDiff;
  }

  private parseData(input: string): SittingHappyLevels {
    const data: SittingHappyLevels = {};
    const regex = /^(.+?) would (gain|lose) (\d+) .+? next to (.+?)\.$/;
    for (const line of input.split("\n")) {
      const [_, name, magnitude, amount, because] = line.match(regex)!;
      if (!(name in data)) {
        data[name] = {};
      }
      const happyLevel =
        magnitude === "gain" ? Number(amount) : -Number(amount);
      data[name][because] = happyLevel;
    }
    return data;
  }
}
