import type { Solution } from "../../common/index.ts";

export class Day07Year2025 implements Solution {
  first(input: string): number {
    const { size, parsedData: data } = this.parseData(input);

    const flowArr = new Array(size).fill(false);
    let splitterCount = 0;
    const startFlow = data[0][0];
    flowArr[startFlow] = true;

    for (let i = 1; i < data.length; i++) {
      for (const splitter of data[i]) {
        if (flowArr[splitter]) {
          splitterCount += 1;
          flowArr[splitter] = false;
          flowArr[splitter - 1] = true;
          flowArr[splitter + 1] = true;
        }
      }
    }
    return splitterCount;
  }

  second(input: string): number {
    const { size, parsedData: data } = this.parseData(input);
    const flowArr = new Array(size).fill(1);

    // We do not want to go up to the very first element
    for (let i = data.length - 1; i > 0; i--) {
      for (const splitter of data[i]) {
        flowArr[splitter] = flowArr[splitter - 1] + flowArr[splitter + 1];
      }
    }
    return flowArr[data[0][0]];
  }

  private parseData(data: string) {
    const lines = data.split("\n");
    const size = lines[0].length;
    const parsedData = data
      .split("\n")
      .map((line) =>
        line
          .split("")
          .map((char, index) => (char == "." ? -1 : index))
          .filter((index) => index != -1)
      )
      .filter((line) => line.length != 0);
    return { size, parsedData };
  }
}
