import type { Solution } from "../../common/index.ts";
type Expression = { operator: "+" | "*"; nums: number[] };
export class Day06Year2025 implements Solution {
  first(input: string): number {
    const expressions = this.parseData(input);
    const sum = expressions.reduce((prev, curr) => {
      if (curr.operator === "*")
        return prev + curr.nums.reduce((product, num) => product * num, 1);
      return prev + curr.nums.reduce((sum, num) => sum + num, 0);
    }, 0);
    return sum;
  }

  second(input: string): number {
    const parsedData = this.parseDataPt2(input);

    const sum = parsedData.reduce((prev, curr) => {
      if (curr.operator === "*")
        return prev + curr.nums.reduce((product, num) => product * num, 1);
      return prev + curr.nums.reduce((sum, num) => sum + num, 0);
    }, 0);
    return sum;
  }

  private parseData(data: string) {
    const lines = data.split("\n").map((line) => line.split(/\s+/g));
    const parsedData: Expression[] = [];
    for (let i = 0; i < lines[0].length; i++) {
      const expression: Expression = {
        operator: "+",
        nums: [],
      };
      for (let j = 0; j < lines.length; j++) {
        if (j == lines.length - 1) {
          expression.operator = lines[j][i] as "*" | "+";
        } else {
          expression.nums.push(parseInt(lines[j][i]));
        }
      }
      parsedData.push(expression);
    }
    return parsedData;
  }

  private parseDataPt2(data: string) {
    const lines = data.split("\n");
    const operators = lines.pop()?.split(/\s+/g) as string[];
    const parsedData: Expression[] = [
      {
        operator: operators[0] as "*" | "+",
        nums: [],
      },
    ];
    for (let i = 0; i < lines[0].length; i++) {
      let numberStr = "";
      let isExpressionComplete = true;
      for (let j = 0; j < lines.length; j++) {
        if (lines[j].at(i) != " ") {
          isExpressionComplete = false;
          numberStr += lines[j].at(i);
        }
      }
      if (isExpressionComplete && i != lines[0].length - 1) {
        parsedData.push({
          operator: operators[parsedData.length] as "*" | "+",
          nums: [],
        });
      } else {
        parsedData[parsedData.length - 1].nums.push(parseInt(numberStr));
      }
    }
    return parsedData;
  }
}
