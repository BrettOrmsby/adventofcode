import type { Solution } from "../../common/index.ts";

interface Replacement {
  pattern: string;
  replacement: string;
  reverseReduceSize: number;
}

interface Data {
  molecule: string;
  replacements: Replacement[];
}

export class Day19Year2015 implements Solution {
  // Loop through all possible single-element replacements and add them to a set
  first(input: string): number {
    const { molecule, replacements } = this.parseData(input);
    const moleculeResultsSet = new Set<string>();

    for (const { pattern, replacement } of replacements) {
      // To find every single-element replacement, we split the molecule by the pattern.
      // Then for each separation location, we replace it with the replacement and join
      // all other parts back with the pattern.
      const partition = molecule.split(pattern);
      for (let i = 1; i < partition.length; i++) {
        const newMolecule =
          partition.slice(0, i).join(pattern) +
          replacement +
          partition.slice(i).join(pattern);
        moleculeResultsSet.add(newMolecule);
      }
    }
    return moleculeResultsSet.size;
  }

  // First sort the replacements by the number of characters that would be decreased if the
  // replacement went in reverse. For example `H => ORnFAr` would be 5 since `ORnFAr` would become
  // `H` and lose 5 characters. Then replace the molecule with the largest difference until it is `e`.
  // This worked with the input, but is not a general solution (greedy heuristic).
  second(input: string): number {
    let { molecule, replacements } = this.parseData(input);

    const sortedReplacementPartitions =
      this.getSortedReplacementPartitions(replacements);

    let i = 0;
    main: while (molecule != "e") {
      i += 1;
      for (const level of sortedReplacementPartitions) {
        for (const { pattern, replacement } of level) {
          const partition = molecule.split(replacement);
          if (partition.length > 1) {
            molecule =
              partition[0] + pattern + partition.slice(1).join(replacement);
            continue main;
          }
        }
      }
    }
    return i;
  }

  private parseData(input: string): Data {
    const replacements: Replacement[] = input
      .split("\n\n")[0]
      .split("\n")
      .map((line) => {
        const [pattern, replacement] = line.split(" => ");
        const reverseReduceSize = replacement.length - pattern.length;
        return { pattern, replacement, reverseReduceSize };
      });
    const molecule = input.match(/[^\n]*$/)![0];
    return {
      replacements,
      molecule,
    };
  }

  private getSortedReplacementPartitions(
    replacements: Replacement[],
  ): Replacement[][] {
    const sortedReplacementPartitions: Replacement[][] = [];
    const sortedReplacements = [...replacements].sort(
      (a, b) => b.reverseReduceSize - a.reverseReduceSize,
    );
    let i = 0;

    while (i < sortedReplacements.length) {
      const partition: Replacement[] = [sortedReplacements[i]];
      const size = sortedReplacements[i].reverseReduceSize;
      i += 1;
      while (
        i < sortedReplacements.length &&
        sortedReplacements[i].reverseReduceSize === size
      ) {
        partition.push(sortedReplacements[i]);
        i += 1;
      }
      sortedReplacementPartitions.push(partition);
    }
    return sortedReplacementPartitions;
  }
}
