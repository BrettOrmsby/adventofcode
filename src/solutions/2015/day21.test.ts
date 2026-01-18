import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day21Year2015 } from "./day21.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 21", () => {
  const solution = new Day21Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 21);
    expect(solution.first(input)).toEqual(78);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 21);
    expect(solution.second(input)).toEqual(148);
  });
});
