import type { Solution } from "../../common/index.ts";

type Value =
  | {
      type: "identifier";
      value: string;
    }
  | { type: "number"; value: number };

interface SetAction {
  action: "SET";
  a: Value;
  label: string;
}

interface NotAction {
  action: "NOT";
  a: Value;
  label: string;
}
interface CompareAction {
  action: "AND" | "OR";
  a: Value;
  b: Value;
  label: string;
}
interface ShiftAction {
  action: "RSHIFT" | "LSHIFT";
  a: Value;
  b: Value;
  label: string;
}
type Action = SetAction | NotAction | CompareAction | ShiftAction;

export class Day07Year2015 implements Solution {
  // Parse the input into actions and run each action in order only if the
  // input dependencies have been mapped, otherwise add them to be run
  // after this iteration
  first(input: string): number {
    let actions = this.parseInput(input);
    const memory: Map<string, number> = new Map();
    const getValueNumber = (input: Value): number =>
      input.type === "number" ? input.value : memory.get(input.value)!;

    while (actions.length > 0) {
      const incompleteActions: Action[] = [];
      for (const action of actions) {
        // Check circuit dependencies
        if ("a" in action && action.a.type === "identifier") {
          if (!memory.has(action.a.value)) {
            incompleteActions.push(action);
            continue;
          }
        }
        if ("b" in action && action.b.type === "identifier") {
          if (!memory.has(action.b.value)) {
            incompleteActions.push(action);
            continue;
          }
        }

        // Run the action if dependencies exist
        let result: number;
        switch (action.action) {
          case "AND":
            result = getValueNumber(action.a) & getValueNumber(action.b);
            break;
          case "OR":
            result = getValueNumber(action.a) | getValueNumber(action.b);
            break;
          case "LSHIFT":
            result = getValueNumber(action.a) << getValueNumber(action.b);
            break;
          case "RSHIFT":
            result = getValueNumber(action.a) >> getValueNumber(action.b);
            break;
          case "NOT":
            result = ~getValueNumber(action.a);
            break;
          case "SET":
            result = getValueNumber(action.a);
            break;
        }
        // Convert the number to 16-bits, see https://stackoverflow.com/a/37774134
        memory.set(action.label, result & 0xffff);
      }
      actions = incompleteActions;
    }
    return memory.get("a")!;
  }

  // Run part 1 to find the value of a, then replace the setting of b in the input
  // to that value and re-run part 1 with the new input
  second(input: string): number {
    const aSignal = this.first(input);
    const newInput = input.replace(/^(\d+|[a-z]+) -> b$/m, aSignal + " -> b");
    return this.first(newInput);
  }

  private parseValue(value: string): Value {
    if (/\d+/.test(value)) {
      return { type: "number", value: Number(value) };
    }
    return { type: "identifier", value };
  }

  private parseInput(input: string): Action[] {
    const setRegex = /^(\d+|[a-z]+) -> ([a-z]+)$/;
    const notRegex = /^NOT (\d+|[a-z]+) -> ([a-z]+)$/;
    const compareRegex = /^(\d+|[a-z]+) (AND|OR) (\d+|[a-z]+) -> ([a-z]+)$/;
    const shiftRegex =
      /^(\d+|[a-z]+) (LSHIFT|RSHIFT) (\d+|[a-z]+) -> ([a-z]+)$/;
    return input.split("\n").map((line): Action => {
      if (setRegex.test(line)) {
        const match = line.match(setRegex)!;
        return {
          action: "SET",
          a: this.parseValue(match[1]),
          label: match[2],
        };
      } else if (notRegex.test(line)) {
        const match = line.match(notRegex)!;
        return {
          action: "NOT",
          a: this.parseValue(match[1]),
          label: match[2],
        };
      } else if (compareRegex.test(line)) {
        const match = line.match(compareRegex)!;
        return {
          action: match[2] as "OR" | "AND",
          a: this.parseValue(match[1]),
          b: this.parseValue(match[3]),
          label: match[4],
        };
      } else {
        const match = line.match(shiftRegex)!;
        return {
          action: match[2] as "LSHIFT" | "RSHIFT",
          a: this.parseValue(match[1]),
          b: this.parseValue(match[3]),
          label: match[4],
        };
      }
    });
  }
}
