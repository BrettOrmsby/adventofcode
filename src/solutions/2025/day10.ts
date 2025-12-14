import type { Solution } from "../../common/index.ts";

export class Day10Year2025 implements Solution {
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

  second(input: string): number {
    const data = this.parseData(input);

    let sum = 0;
    const getNonEmptyButtonCombinations = (
      buttons: number[]
    ): { count: number; bits: number; buttons: number[] }[] => {
      const combinations: { count: number; bits: number; buttons: number[] }[] =
        [];
      for (let i = 0; i < buttons.length; i++) {
        const l = combinations.length;
        for (let j = 0; j < l; j++) {
          combinations.push({
            count: combinations[j].count + 1,
            bits: buttons[i] ^ combinations[j].bits,
            buttons: [...combinations[j].buttons, buttons[i]],
          });
        }
        combinations.push({
          count: 1,
          bits: buttons[i],
          buttons: [buttons[i]],
        });
      }
      combinations.push({ count: 0, bits: 0, buttons: [] });
      return combinations;
    };

    const recurse = (joltage: number[], buttons: number[]): number => {
      if (joltage.every((num) => num === 0)) return 0;

      const parityJoltageBits = parseInt(
        joltage.map((num) => (num % 2 === 0 ? "0" : "1")).join(""),
        2
      );
      const buttonsCombinations = getNonEmptyButtonCombinations([
        ...buttons,
      ]).filter(({ bits }) => bits === parityJoltageBits);

      let min = Infinity;
      for (const combination of buttonsCombinations) {
        const bitArr = combination.buttons.reduce((arr, button) => {
          const bits = button
            .toString(2)
            .padStart(joltage.length, "0")
            .split("")
            .map(Number);
          for (let i = 0; i < arr.length; i++) {
            arr[i] += bits[i];
          }
          return arr;
        }, new Array(joltage.length).fill(0));

        const newJoltage = joltage.map((num, i) => (num - bitArr[i]) / 2);
        //if (bitArr.some((v, i) => v > joltage[i] || (v & 1) !== (joltage[i] & 1))) continue;
        //if (newJoltage.some(num => num % 1 !== 0)) continue;
        if (newJoltage.some((num) => num < 0)) continue;

        const count = 2 * recurse(newJoltage, buttons) + combination.count;
        if (count < min) min = count;
      }
      return min;
      // TODO: remember to catch
    };
    for (const { joltage, buttons } of data) {
      sum += recurse(joltage, buttons);
    }
    return sum;
  }
  private parseData(data: string) {
    return data.split("\n").map((line) => {
      const indicatorLightBitString = line
        .match(/\[([.#]+)\]/)![1]
        .split("")
        .map((char) => (char === "#" ? "1" : "0"))
        .join("");
      const indicatorLights = parseInt(indicatorLightBitString, 2);

      const buttonToggles = [...line.matchAll(/\(([0-9,]+)\)/g)].map((data) =>
        data[1].split(",").map((number) => parseInt(number))
      );
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
        .map((number) => parseInt(number));
      return { indicatorLights, buttons, joltage };
    });
  }
}
