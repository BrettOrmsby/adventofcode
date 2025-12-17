import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day03Year2015 } from "./day03.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 03", () => {
  const solution = new Day03Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 3);
    expect(solution.first(input)).toEqual(2572);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 3);
    expect(solution.second(input)).toEqual(2631);
  });
});
