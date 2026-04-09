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
interface DecCommand {
  type: "dec";
  register: Register;
}
interface JnzCommand {
  type: "jnz";
  value: Register | number;
  register: Register;
}

type Command = CpyCommand | IncCommand | DecCommand | JnzCommand;

export class Day12Year2016 implements Solution {
  // Parse the data into commands, then loop through the program using a program
  // counter and run the commands.
  first(input: string): number {
    const registers = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    };

    return this.runProgram(input, registers).a;
  }

  // Do the same as part 1 but with different register values
  second(input: string): number {
    const registers = {
      a: 0,
      b: 0,
      c: 1,
      d: 0,
    };

    return this.runProgram(input, registers).a;
  }

  private runProgram(
    program: string,
    registers: Record<Register, number>,
  ): Record<Register, number> {
    const convertValue = (value: Register | number): number =>
      typeof value == "string" ? registers[value] : value;

    const commands = this.parseData(program);
    let i = 0;
    while (i < commands.length) {
      const command = commands[i];
      switch (command.type) {
        case "cpy":
          registers[command.register] = convertValue(command.value);
          break;
        case "inc":
          registers[command.register] += 1;
          break;
        case "dec":
          registers[command.register] -= 1;
          break;
        case "jnz":
          if (registers[command.register] !== 0) {
            i += convertValue(command.value);
            continue;
          }
          break;
      }
      i++;
    }
    return registers;
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
        default:
          return {
            type: "jnz",
            value: convertValue(v2),
            register: v1 as Register,
          };
      }
    });
  }
}
