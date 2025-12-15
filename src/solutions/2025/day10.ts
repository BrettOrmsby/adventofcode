import type { Solution } from "../../common/index.ts";

interface MachineRow {
  indicatorLights: number;
  buttons: number[];
  joltage: number[];
}

interface ButtonCombination {
  count: number;
  bits: number;
  buttonSums: number[];
}

export class Day10Year2025 implements Solution {
  // For each row, build the combinations of buttons in order of the number of buttons
  // combined until we find one that matches the indicator, then sum the count of buttons
  first(input: string): number {
    const data = this.parseData(input);

    const sum = data.reduce((sum, { indicatorLights, buttons }) => {
      const buttonGroups = new Set(buttons);
      let i = 1;
      while (true) {
        for (const buttonGroup of buttonGroups) {
          if (buttonGroup === indicatorLights) return sum + i;
        }
        [...buttonGroups].forEach((group) => {
          for (const button of buttons) {
            buttonGroups.add(group ^ button);
          }
        });
        i += 1;
      }
    }, 0);
    return sum;
  }

  // Here is the other part I needed help with. I followed along with this post https://www.reddit.com/r/adventofcode/s/Z0KvQPbeCq,
  // which explains the process very well. Basically we recursively find the buttons that we need to press in order to get the joltage to all
  // even numbers, then we divide that joltage by 2 and do it again until the solution is found.
  second(input: string): number {
    const data = this.parseData(input);

    // I've found this is slower with memorization, so we are avoiding it
    const recurse = (
      joltage: number[],
      buttonCombinations: Map<number, ButtonCombination[]>
    ): number => {
      if (joltage.every((num) => num === 0)) return 0;

      const parityJoltageBits = parseInt(
        joltage.map((num) => (num % 2 === 0 ? "0" : "1")).join(""),
        2
      );

      let min = Infinity;
      for (const combination of buttonCombinations.get(parityJoltageBits) ||
        []) {
        const newJoltage = joltage.map(
          (num, i) => (num - combination.buttonSums[i]) / 2
        );
        if (newJoltage.some((num) => num < 0)) continue;

        const count =
          2 * recurse(newJoltage, buttonCombinations) + combination.count;
        min = Math.min(min, count);
      }

      return min;
    };

    let sum = 0;
    for (const { joltage, buttons } of data) {
      const buttonCombinations = this.getButtonCombinations(
        buttons,
        joltage.length
      );

      // Organize combinations into a map by their bits (parity, odds=1)
      const parityCombinations: Map<number, ButtonCombination[]> = new Map();
      buttonCombinations.forEach((combination) => {
        if (parityCombinations.has(combination.bits)) {
          parityCombinations.get(combination.bits)!.push(combination);
        } else {
          parityCombinations.set(combination.bits, [combination]);
        }
      });
      sum += recurse(joltage, parityCombinations);
    }
    return sum;
  }

  // Parse indicator lights and buttons as byte strings
  private parseData(data: string): MachineRow[] {
    return data.split("\n").map((line) => {
      const indicatorLightBitString = line
        .match(/\[([.#]+)\]/)![1]
        .split("")
        .map((char) => (char === "#" ? "1" : "0"))
        .join("");
      const indicatorLights = parseInt(indicatorLightBitString, 2);

      const buttonToggles = line
        .matchAll(/\(([0-9,]+)\)/g)
        .toArray()
        .map((data) => data[1].split(",").map(Number));
      const buttons = buttonToggles.map((button) => {
        let bitString = "";
        for (let i = 0; i < indicatorLightBitString.length; i++) {
          bitString += button.includes(i) ? "1" : "0";
        }
        return parseInt(bitString, 2);
      });
      const joltage = line
        .match(/\{([0-9,]+)\}/)![1]
        .split(",")
        .map(Number);
      return { indicatorLights, buttons, joltage };
    });
  }

  // Gets all combinations of buttons and keeps track of their size, resulting bit string (for toggling),
  // and an array of the counts each joltage item is pressed.
  private getButtonCombinations(
    buttons: number[],
    joltageSize: number
  ): ButtonCombination[] {
    const combinations: ButtonCombination[] = [];

    const addButtonToArr = (button: number, arr: number[]) => {
      button
        .toString(2)
        .padStart(joltageSize, "0")
        .split("")
        .forEach((bit, i) => (arr[i] += Number(bit)));
      return arr;
    };

    for (const button of buttons) {
      const l = combinations.length;
      for (let i = 0; i < l; i++) {
        combinations.push({
          count: combinations[i].count + 1,
          bits: button ^ combinations[i].bits,
          buttonSums: addButtonToArr(button, [...combinations[i].buttonSums]),
        });
      }
      combinations.push({
        count: 1,
        bits: button,
        buttonSums: addButtonToArr(button, new Array(joltageSize).fill(0)),
      });
    }
    combinations.push({
      count: 0,
      bits: 0,
      buttonSums: new Array(joltageSize).fill(0),
    });
    return combinations;
  }
}
