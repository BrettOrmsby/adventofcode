import type { Solution } from "../../common/index.ts";

interface SwapPosCommand {
  type: "swapPos";
  x: number;
  y: number;
}
interface SwapLetterCommand {
  type: "swapLetter";
  x: string;
  y: string;
}
interface RotateCommand {
  type: "rotate";
  direction: "left" | "right";
  by: number;
}
interface RotateByLetterCommand {
  type: "rotateLetter";
  letter: string;
}
interface ReverseCommand {
  type: "reverse";
  x: number;
  y: number;
}
interface MoveCommand {
  type: "move";
  from: number;
  to: number;
}

type Command =
  | SwapPosCommand
  | SwapLetterCommand
  | RotateCommand
  | RotateByLetterCommand
  | ReverseCommand
  | MoveCommand;

type CommandHandlers = {
  [K in Command["type"]]: (
    command: Extract<Command, { type: K }>,
    scramble: string[],
  ) => string[];
};

export class Day21Year2016 implements Solution {
  // Follow through the instructions, doing the desired
  // action on the array of characters
  first(input: string): string {
    const commands = this.parseData(input);
    const runInstruction = this.getRunInstruction();

    let scramble = "abcdefgh".split("");
    for (const command of commands) {
      scramble = runInstruction(command, scramble);
    }
    return scramble.join("");
  }

  // Do basically the same as part 1, but some actions
  // are modified including the rotate by x steps, move
  // and rotate by letter. Rotate by letter offsets are
  // hardcoded after manually determining the shift amounts
  second(input: string): string {
    const commands = this.parseData(input).reverse();
    const runInstruction = this.getRunInstruction(true);

    let scramble = "fbgdceah".split("");
    for (const command of commands) {
      scramble = runInstruction(command, scramble);
    }
    return scramble.join("");
  }

  private getRunInstruction(isDecoding = false) {
    const handlers: CommandHandlers = {
      swapPos(command, scramble) {
        [scramble[command.x], scramble[command.y]] = [
          scramble[command.y],
          scramble[command.x],
        ];
        return scramble;
      },
      swapLetter(command, scramble) {
        let indexOfX = -1;
        let indexOfY = -1;
        for (let i = 0; i < scramble.length; i++) {
          if (scramble[i] === command.x) indexOfX = i;
          if (scramble[i] === command.y) indexOfY = i;
        }
        [scramble[indexOfX], scramble[indexOfY]] = [
          scramble[indexOfY],
          scramble[indexOfX],
        ];
        return scramble;
      },
      rotate(command, scramble) {
        const newScramble = [...scramble];
        const offsetAlter = isDecoding ? "left" : "right";
        const offset =
          command.direction === offsetAlter
            ? command.by
            : scramble.length - command.by;
        for (let i = 0; i < scramble.length; i++) {
          newScramble[(i + offset) % scramble.length] = scramble[i];
        }
        scramble = newScramble;
        return scramble;
      },
      rotateLetter(command, scramble) {
        let offset = 0;
        if (isDecoding) {
          offset = {
            0: 7,
            1: 7,
            2: 2,
            3: 6,
            4: 1,
            5: 5,
            6: 0,
            7: 4,
          }[scramble.indexOf(command.letter)]!;
        } else {
          const letterIndex = scramble.findIndex(
            (letter) => letter === command.letter,
          );
          offset = letterIndex + 1 + (letterIndex >= 4 ? 1 : 0);
        }

        const newScramble = [...scramble];
        for (let i = 0; i < scramble.length; i++) {
          newScramble[(i + offset) % scramble.length] = scramble[i];
        }
        scramble = newScramble;
        return scramble;
      },
      reverse(command, scramble) {
        const numberSwaps = Math.floor((command.y - command.x) / 2);
        for (let i = 0; i <= numberSwaps; i += 1) {
          [scramble[command.x + i], scramble[command.y - i]] = [
            scramble[command.y - i],
            scramble[command.x + i],
          ];
        }
        return scramble;
      },
      move(command, scramble) {
        const [char] = scramble.splice(
          isDecoding ? command.to : command.from,
          1,
        );
        scramble.splice(isDecoding ? command.from : command.to, 0, char);
        return scramble;
      },
    };

    // This is needed to make Typescript happy rather than
    // just returning the handlers, since then it would
    // raise an error when calling `handlers[command.type](command, scramble)`
    // in the main program loop.
    return <K extends Command["type"]>(
      command: Extract<Command, { type: K }>,
      scramble: string[],
    ): string[] => {
      return handlers[command.type](command, scramble);
    };
  }

  private parseData(input: string): Command[] {
    const swapPosRegex = /^swap position (\d+) with position (\d+)$/;
    const swapLetterRegex = /^swap letter (\w) with letter (\w)$/;
    const rotateRegex = /^rotate (left|right) (\d+) steps?$/;
    const rotateByLetterRegex = /^rotate based on position of letter (\w)$/;
    const reverseRegex = /^reverse positions (\d+) through (\d+)$/;
    const moveRegex = /^move position (\d+) to position (\d+)$/;
    return input.split("\n").map((line): Command => {
      const swapMatch = line.match(swapPosRegex);
      if (swapMatch) {
        return {
          type: "swapPos",
          x: parseInt(swapMatch[1]),
          y: parseInt(swapMatch[2]),
        };
      }

      const swapLetterMatch = line.match(swapLetterRegex);
      if (swapLetterMatch) {
        return {
          type: "swapLetter",
          x: swapLetterMatch[1],
          y: swapLetterMatch[2],
        };
      }

      const rotateMatch = line.match(rotateRegex);
      if (rotateMatch) {
        return {
          type: "rotate",
          direction: rotateMatch[1] as "left" | "right",
          by: parseInt(rotateMatch[2]),
        };
      }

      const rotateByLetterMatch = line.match(rotateByLetterRegex);
      if (rotateByLetterMatch) {
        return {
          type: "rotateLetter",
          letter: rotateByLetterMatch[1],
        };
      }

      const reverseMatch = line.match(reverseRegex);
      if (reverseMatch) {
        return {
          type: "reverse",
          x: parseInt(reverseMatch[1]),
          y: parseInt(reverseMatch[2]),
        };
      }

      const moveMatch = line.match(moveRegex);
      if (moveMatch) {
        return {
          type: "move",
          from: parseInt(moveMatch[1]),
          to: parseInt(moveMatch[2]),
        };
      }

      throw new Error("Failed to match");
    });
  }
}
