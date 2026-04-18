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
  condition: Register | number;
  value: Register | number;
}
interface ToggleCommand {
  type: "tgl";
  register: Register;
}

type Command =
  | CpyCommand
  | IncCommand
  | DecCommand
  | JnzCommand
  | ToggleCommand;

export class Day23Year2016 implements Solution {
  // This solution uses the main code from day 12, but the
  // jump command needs to handle numbers as the condition.
  // And the new toggle instruction is added.
  first(input: string): number {
    const registers = {
      a: 7,
      b: 0,
      c: 0,
      d: 0,
    };

    return this.runProgram(input, registers).a;
  }

  // Do the same as part 2 with different input. It will take a
  // while to run normally (~40s). But with an added optimization
  // to bypass the multiplication it is much faster. This is the
  // area that is bypassed:
  // cpy b c
  // inc a
  // dec c
  // jnz c -2 // Everything here and above is a += b
  // dec d
  // jnz d -5 // Everything here and above is a += b * d
  second(input: string): number {
    const registers = {
      a: 12,
      b: 0,
      c: 0,
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
          // Part 2 multiplication shortcut
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
        case "jnz":
          if (convertValue(command.condition) !== 0) {
            i += convertValue(command.value);
            continue;
          }
          break;
        case "tgl": {
          const toggleIndex = i + registers[command.register];
          const toggleCommand = commands[toggleIndex];
          if (!toggleCommand) break;
          switch (toggleCommand.type) {
            case "inc":
              commands[toggleIndex] = {
                type: "dec",
                register: toggleCommand.register,
              };
              break;
            case "dec":
            case "tgl":
              commands[toggleIndex] = {
                type: "inc",
                register: toggleCommand.register,
              };
              break;
            case "jnz":
              commands[toggleIndex] = {
                type: "cpy",
                value: toggleCommand.condition,
                register: toggleCommand.value as Register,
              };
              break;
            case "cpy":
              commands[toggleIndex] = {
                type: "jnz",
                condition: toggleCommand.value,
                value: toggleCommand.register,
              };
              break;
          }
        }
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
        case "tgl":
          return {
            type: "tgl",
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
