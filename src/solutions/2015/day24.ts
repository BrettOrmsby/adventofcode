import { combinations, type Solution } from "../../common/index.ts";

interface Group {
  product: number;
  sum: number;
  size: number;
}

type Grouping = {
  group: number[];
  remainder: number[];
};

export class Day24Year2015 implements Solution {
  // Get all possible groups that sum to a third of the total. Then check each for if
  // the remaining numbers can be partitioned into 2 equal groups. From there, we minimize
  // the size of the initial group and the quantum entanglement (product)
  first(input: string): number {
    const data = this.parseData(input);
    const targetSize = data.reduce((a, b) => a + b, 0) / 3;
    const groups = this.findAllGroups(targetSize, data);

    const doesPartitionIntoEqualSums = (
      data: number[],
      index: number,
      sum: number = 0,
    ): boolean => {
      if (index === -1 && sum === targetSize) {
        return true;
      }
      if (index === -1) return false;
      return (
        doesPartitionIntoEqualSums(data, index - 1, sum + data[index]) ||
        doesPartitionIntoEqualSums(data, index - 1, sum)
      );
    };

    let minSolution = { size: Infinity, product: Infinity };
    for (const group of groups) {
      if (
        doesPartitionIntoEqualSums(group.remainder, group.remainder.length - 1)
      ) {
        const size = group.group.length;
        const product = group.group.reduce((p, a) => a * p, 1);
        if (size < minSolution.size) {
          minSolution = { size, product };
        } else if (size === minSolution.size && product < minSolution.product) {
          minSolution = { size, product };
        }
      }
    }

    return minSolution.product;
  }

  // Partition the data into halves, then do so again for each half. If the data can partition,
  // we need to look through all groups to minimize size and quantum entanglement (product).
  // This took about 32 minutes to run, so it is definitely not optimized
  second(input: string): number {
    const data = this.parseData(input);
    const targetSize = data.reduce((a, b) => a + b, 0) / 4;
    const halves = this.findAllGroups(targetSize * 2, data);

    const computedResults = new Map<string, boolean>();
    const groupsToCheck = new Set<string>();
    for (const pair of halves) {
      const firstHalfKey = pair.group.sort().join("-");
      const secondHalfKey = pair.remainder.sort().join("-");
      if (!computedResults.has(firstHalfKey)) {
        if (
          computedResults.has(secondHalfKey) &&
          !computedResults.get(secondHalfKey)
        ) {
          continue;
        }
        const firstHalfHalves = this.findAllGroups(targetSize, pair.group);
        firstHalfHalves.forEach((group) => {
          groupsToCheck.add(group.group.sort().join("-"));
          groupsToCheck.add(group.remainder.sort().join("-"));
        });
        computedResults.set(firstHalfKey, firstHalfHalves.length === 0);
        if (firstHalfHalves.length === 0) continue;
      }

      if (!computedResults.has(secondHalfKey)) {
        if (
          computedResults.has(firstHalfKey) &&
          !computedResults.get(firstHalfKey)
        ) {
          continue;
        }
        const secondHalfHalves = this.findAllGroups(targetSize, pair.remainder);
        secondHalfHalves.forEach((group) => {
          groupsToCheck.add(group.group.sort().join("-"));
          groupsToCheck.add(group.remainder.sort().join("-"));
        });
        computedResults.set(secondHalfKey, secondHalfHalves.length === 0);
        if (secondHalfHalves.length === 0) continue;
      }
    }

    let minSolution = { size: Infinity, product: Infinity };
    for (const group of groupsToCheck) {
      const numbers = group.split("-");
      const size = numbers.length;
      const product = group.split("-").reduce((p, a) => Number(a) * p, 1);
      if (size < minSolution.size) {
        minSolution = { size, product };
      } else if (size === minSolution.size && product < minSolution.product) {
        minSolution = { size, product };
      }
    }
    return minSolution.product;
  }

  private parseData(input: string): number[] {
    return input.split("\n").map(Number);
  }

  // Recursive entrypoint to get all groups from the data with a sum equal to the target
  private findAllGroups(target: number, data: number[]) {
    const groups: Grouping[] = [];
    this.findAllGroupsRecurse(
      target,
      data,
      data.length - 1,
      0,
      { group: [], remainder: [] },
      groups,
    );
    return groups;
  }

  private findAllGroupsRecurse(
    target: number,
    data: number[],
    index: number,
    sum: number,
    currentGroup: Grouping,
    groups: Grouping[],
  ) {
    if (index === -1 && sum === target) {
      groups.push(currentGroup);
      return;
    }
    if (index === -1) return;
    const newGroupingIfAdd: Grouping = {
      group: [...currentGroup.group, data[index]],
      remainder: [...currentGroup.remainder],
    };
    const newGroupingIfNotAdd: Grouping = {
      group: [...currentGroup.group],
      remainder: [...currentGroup.remainder, data[index]],
    };
    if (sum + data[index] <= target) {
      this.findAllGroupsRecurse(
        target,
        data,
        index - 1,
        sum + data[index],
        newGroupingIfAdd,
        groups,
      );
    }
    this.findAllGroupsRecurse(
      target,
      data,
      index - 1,
      sum,
      newGroupingIfNotAdd,
      groups,
    );
  }
}
