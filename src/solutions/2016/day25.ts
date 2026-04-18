import type { Solution } from "../../common/index.ts";

type Register = "a" | "b" | "c" | "d";
interface CpyCommand {
  type: "cpy";
  value: Register | number;
  register: Register;
}
interface IncCommand {
  type: "inc";
  register: Register;
}
interface OutCommand {
  type: "out";
  register: Register;
}
interface DecCommand {
  type: "dec";
  register: Register;
}
interface JnzCommand {
  type: "jnz";
  condition: Register | number;
  value: Register | number;
}

type Command = CpyCommand | IncCommand | DecCommand | JnzCommand | OutCommand;

export class Day25Year2016 implements Solution {
  // Use the main code from day 23 without the toggle command,
  // but with the new output command that yields the register.
  // Then test values for the a register until a result repeats
  // the pattern 100 times.
  first(input: string): number {
    let i = 0;
    main: while (true) {
      const registers = {
        a: i,
        b: 0,
        c: 0,
        d: 0,
      };
      const itr = this.runProgram(input, registers);
      for (let j = 0; j < 100; j++) {
        const isFollowPattern =
          itr.next().value === 0 && itr.next().value === 1;
        if (!isFollowPattern) {
          i += 1;
          continue main;
        }
      }
      return i;
    }
  }

  second(_input: string): number {
    return -1;
  }

  private *runProgram(
    program: string,
    registers: Record<Register, number>,
  ): Generator<number> {
    const convertValue = (value: Register | number): number =>
      typeof value == "string" ? registers[value] : value;

    const commands = this.parseData(program);
    let i = 0;
    while (i < commands.length) {
      const command = commands[i];
      switch (command.type) {
        case "cpy":
          // Multiplication shortcut
          if (
            [
              "cpy b c",
              "inc a",
              "dec c",
              "jnz c -2",
              "dec d",
              "jnz d -5",
            ].every(
              (line, index) =>
                JSON.stringify(this.parseData(line)[0]) ===
                JSON.stringify(commands[i + index] ?? {}),
            )
          ) {
            registers["a"] += registers["b"] * registers["d"];
            i += 5;
          } else {
            registers[command.register] = convertValue(command.value);
          }
          break;
        case "inc":
          registers[command.register] += 1;
          break;
        case "dec":
          registers[command.register] -= 1;
          break;
        case "out":
          yield registers[command.register];
          break;
        case "jnz":
          if (convertValue(command.condition) !== 0) {
            i += convertValue(command.value);
            continue;
          }
          break;
      }
      i++;
    }
  }

  private parseData(input: string): Command[] {
    const convertValue = (val: string): Register | number =>
      ["a", "b", "c", "d"].includes(val) ? (val as Register) : parseInt(val);
    return input.split("\n").map((line): Command => {
      const [type, v1, v2] = line.split(" ");
      switch (type) {
        case "cpy":
          return {
            type,
            value: convertValue(v1),
            register: v2 as Register,
          };
        case "inc":
          return {
            type,
            register: v1 as Register,
          };
        case "dec":
          return {
            type,
            register: v1 as Register,
          };
        case "out":
          return {
            type: "out",
            register: v1 as Register,
          };
        default:
          return {
            type: "jnz",
            condition: convertValue(v1),
            value: convertValue(v2),
          };
      }
    });
  }
}
