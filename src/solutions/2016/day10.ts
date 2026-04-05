import type { Solution } from "../../common/index.ts";

type Data = {
  values: number[];
  giveToLow: { output: number; bot: number };
  giveToHigh: { output: number; bot: number };
};

export class Day10Year2016 implements Solution {
  // Maintain a stack of bots with 2 chips (values) and keep popping
  // the stack and distributing the chips to other bots until the
  // bot possesses 17 and 61
  first(input: string): number {
    const { bots, startBot } = this.parseData(input);
    const botsStack = [startBot];

    while (botsStack.length > 0) {
      const botNumber = botsStack.pop()!;
      const data = bots.get(botNumber)!;
      const low = Math.min(...data.values);
      const high = Math.max(...data.values);
      if (low === 17 && high === 61) return botNumber;

      if (data.giveToHigh.bot >= 0) {
        const highBot = bots.get(data.giveToHigh.bot)!;
        highBot.values.push(high);
        if (highBot.values.length === 2) botsStack.push(data.giveToHigh.bot);
      }

      if (data.giveToLow.bot >= 0) {
        const lowBot = bots.get(data.giveToLow.bot)!;
        lowBot.values.push(low);
        if (lowBot.values.length === 2) botsStack.push(data.giveToLow.bot);
      }
    }

    return -1;
  }

  // Use the same looping structure as part 1, but also distribute chips
  // to the output. End the looping when the stack of bots is empty.
  second(input: string): number {
    const { bots, startBot } = this.parseData(input);
    const outputs = new Map<number, number>();
    const botsStack = [startBot];

    while (botsStack.length > 0) {
      const botNumber = botsStack.pop()!;
      const data = bots.get(botNumber)!;
      const low = Math.min(...data.values);
      const high = Math.max(...data.values);

      if (data.giveToHigh.output >= 0)
        outputs.set(data.giveToHigh.output, high);
      if (data.giveToLow.output >= 0) outputs.set(data.giveToLow.output, low);

      if (data.giveToHigh.bot >= 0) {
        const highBot = bots.get(data.giveToHigh.bot)!;
        highBot.values.push(high);
        if (highBot.values.length === 2) botsStack.push(data.giveToHigh.bot);
      }
      if (data.giveToLow.bot >= 0) {
        const lowBot = bots.get(data.giveToLow.bot)!;
        lowBot.values.push(low);
        if (lowBot.values.length === 2) botsStack.push(data.giveToLow.bot);
      }
    }

    return outputs.get(0)! * outputs.get(1)! * outputs.get(2)!;
  }

  private parseData(input: string) {
    const givesRegex =
      /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/;
    const getsRegex = /value (\d+) goes to bot (\d+)/;

    let startBot = -1;
    const bots: Map<number, Data> = new Map();

    for (const line of input.split("\n")) {
      if (givesRegex.test(line)) {
        const [_, bot, lowTarget, low, highTarget, high] =
          line.match(givesRegex)!;
        const botNumber = parseInt(bot);
        const oldData = bots.get(botNumber) ?? {
          values: [],
          giveToLow: { output: -1, bot: -1 },
          giveToHigh: { output: -1, bot: -1 },
        };
        oldData.giveToLow[lowTarget as "bot" | "output"] = parseInt(low);
        oldData.giveToHigh[highTarget as "bot" | "output"] = parseInt(high);
        bots.set(botNumber, oldData);
        continue;
      }

      const [_, value, bot] = line.match(getsRegex)!;
      const botNumber = parseInt(bot);
      const oldData = bots.get(botNumber) ?? {
        values: [],
        giveToLow: { output: -1, bot: -1 },
        giveToHigh: { output: -1, bot: -1 },
      };
      oldData.values.push(parseInt(value));
      bots.set(botNumber, oldData);
      if (oldData.values.length === 2) startBot = botNumber;
    }

    return { startBot, bots };
  }
}
