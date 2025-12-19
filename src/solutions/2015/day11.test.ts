import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day11Year2015 } from "./day11.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 11", () => {
  const solution = new Day11Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 11);
    expect(solution.first(input)).toEqual("vzbxxyzz");
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 11);
    expect(solution.second(input)).toEqual("vzcaabcc");
  });
});
