import type { Solution } from "../../common/index.ts";

type Expression = { operator: "+" | "*"; nums: number[] };

export class Day06Year2025 implements Solution {
  // The hardest part of this problem is parsing the data
  // Afterwards we compute and sum the solutions
  first(input: string): number {
    const expressions = this.parseData(input);
    const sum = expressions.reduce((prev, curr) => {
      if (curr.operator === "*")
        return prev + curr.nums.reduce((product, num) => product * num, 1);
      return prev + curr.nums.reduce((sum, num) => sum + num, 0);
    }, 0);
    return sum;
  }

  // Similarly to part 1, the only difficult thing is parsing the data
  second(input: string): number {
    const parsedData = this.parseDataPt2(input);

    const sum = parsedData.reduce((prev, curr) => {
      if (curr.operator === "*")
        return prev + curr.nums.reduce((product, num) => product * num, 1);
      return prev + curr.nums.reduce((sum, num) => sum + num, 0);
    }, 0);
    return sum;
  }

  // Split lines by whitespace and add the operator or numbers at the same
  // indexes as an expression
  private parseData(data: string) {
    const lines = data.split("\n").map((line) => line.split(/\s+/g));
    const operators = lines.pop()!;
    const lineSize = lines[0].length;

    const parsedData: Expression[] = [];
    for (let i = 0; i < lineSize; i++) {
      const expression: Expression = {
        operator: operators[i] as "*" | "+",
        nums: [],
      };
      for (let j = 0; j < lines.length; j++) {
        expression.nums.push(parseInt(lines[j][i]));
      }
      parsedData.push(expression);
    }
    return parsedData;
  }

  // Instead of splitting by whitespace, a new expression happens whenever
  // we reach a new operator when going character by character in the lines.
  // We can create the number by going down the lines at the same indexes.
  private parseDataPt2(data: string) {
    const lines = data.split("\n");
    const lineSize = lines[0].length;
    const operators = lines.pop()!;

    const parsedData: Expression[] = [];
    for (let i = 0; i < lineSize; i++) {
      if (operators[i] !== " ") {
        parsedData.push({
          operator: operators[i] as "*" | "+",
          nums: [],
        });
      }
      let num = "";
      for (let j = 0; j < lines.length; j++) {
        if (lines[j][i] !== " ") {
          num += lines[j][i];
        }
      }
      if (num != "") parsedData.at(-1)?.nums.push(parseInt(num));
    }

    return parsedData;
  }
}
