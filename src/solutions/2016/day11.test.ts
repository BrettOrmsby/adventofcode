import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day11Year2016 } from "./day11.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 11", () => {
  const solution = new Day11Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 11);
    expect(solution.first(input)).toEqual(47);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 11);
    expect(solution.second(input)).toEqual(71);
  });
});
