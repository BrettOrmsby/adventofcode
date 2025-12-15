import type { Solution } from "../../common/index.ts";

export class Day07Year2025 implements Solution {
  // Using indexes of the splitter, we can go through level by level
  // and update the flow array by stopping the flow at that index and
  // starting the flow on either side
  first(input: string): number {
    const { size, parsedData: data } = this.parseData(input);

    const flowArr = new Array(size).fill(false);
    let splitterCount = 0;
    const startFlowIndex = data[0][0];
    flowArr[startFlowIndex] = true;

    for (let i = 1; i < data.length; i++) {
      for (const splitter of data[i]) {
        if (flowArr[splitter]) {
          splitterCount += 1;
          flowArr[splitter] = false;
          // We do not need to check bounds since the input has a space of padding
          // Splitters also are not beside one another, so this will not affect the
          // the following splitters on the same level
          flowArr[splitter - 1] = true;
          flowArr[splitter + 1] = true;
        }
      }
    }
    return splitterCount;
  }

  // Instead of tracking the flow, we start at the bottom of the splitters and track
  // the number of paths that would be created if that splitter was hit. The solution
  // will be at the index of the source.
  second(input: string): number {
    const { size, parsedData: data } = this.parseData(input);
    const flowArr = new Array(size).fill(1);

    // Avoid the source level
    for (let i = data.length - 1; i > 0; i--) {
      for (const splitter of data[i]) {
        flowArr[splitter] = flowArr[splitter - 1] + flowArr[splitter + 1];
      }
    }

    const startFlowIndex = data[0][0];
    return flowArr[startFlowIndex];
  }

  // Create a 2D array of splitter indexes
  private parseData(data: string) {
    const lines = data.split("\n");
    const size = lines[0].length;
    const parsedData = lines
      .map((line) =>
        line.split("").reduce((arr, char, i) => {
          if (char !== ".") arr.push(i);
          return arr;
        }, [] as number[])
      )
      .filter((line) => line.length != 0);
    return { size, parsedData };
  }
}
