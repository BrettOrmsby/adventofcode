import type { Solution } from "../../common/index.ts";

interface BasicInstruction {
  type: "basic";
  action: "hlf" | "tpl" | "inc";
  register: string;
}

interface Jump {
  type: "jump";
  offset: number;
  condition: "none" | "even" | "one";
  register: string;
}

type Instruction = BasicInstruction | Jump;

export class Day23Year2015 implements Solution {
  // Parse the instructions into objects then repeat through them with a
  // program counter, completing instructions until the end is reached.
  // Then return the value in `b`
  first(input: string): number {
    const instructions = this.parseData(input);
    const register = new Map<string, number>();
    this.runProgram(instructions, register);
    return register.get("b")!;
  }

  // Do the same as part 1, but `a` starts at 1
  second(input: string): number {
    const instructions = this.parseData(input);
    const register = new Map<string, number>();
    register.set("a", 1);
    this.runProgram(instructions, register);
    return register.get("b")!;
  }

  // To run the computer program
  private runProgram(
    instructions: Instruction[],
    register: Map<string, number>,
  ) {
    let counter = 0;
    while (counter < instructions.length) {
      const instruction = instructions[counter];
      if (!register.has(instruction.register))
        register.set(instruction.register, 0);

      if (instruction.type === "basic") {
        switch (instruction.action) {
          case "hlf":
            register.set(
              instruction.register,
              register.get(instruction.register)! / 2,
            );
            break;
          case "tpl":
            register.set(
              instruction.register,
              register.get(instruction.register)! * 3,
            );
            break;
          case "inc":
            register.set(
              instruction.register,
              register.get(instruction.register)! + 1,
            );
            break;
        }
        counter += 1;
        continue;
      }

      // Jump
      if (instruction.condition === "none") {
        counter += instruction.offset;
      } else if (instruction.condition === "even") {
        if (register.get(instruction.register)! % 2 === 0) {
          counter += instruction.offset;
        } else {
          counter += 1;
        }
      } else if (instruction.condition === "one") {
        if (register.get(instruction.register)! === 1) {
          counter += instruction.offset;
        } else {
          counter += 1;
        }
      }
    }
  }

  private parseData(input: string): Instruction[] {
    return input.split("\n").map((line): Instruction => {
      const simpleMatch = line.match(/^(hlf|tpl|inc) ([a-zA-Z]+)$/);
      if (simpleMatch) {
        return {
          type: "basic",
          action: simpleMatch[1] as "hlf" | "tpl" | "inc",
          register: simpleMatch[2],
        };
      }

      const jmpMatch = line.match(/^jmp \+?(-?\d+)$/);
      if (jmpMatch) {
        return {
          type: "jump",
          offset: Number(jmpMatch[1]),
          condition: "none",
          register: "",
        };
      }

      const conditionJmpMatch = line.match(
        /^(jio|jie) ([a-zA-Z]+), \+?(-?\d+)$/,
      )!;
      return {
        type: "jump",
        offset: Number(conditionJmpMatch[3]),
        register: conditionJmpMatch[2],
        condition: conditionJmpMatch[1] === "jie" ? "even" : "one",
      };
    });
  }
}
