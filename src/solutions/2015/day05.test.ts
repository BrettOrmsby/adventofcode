import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day05Year2015 } from "./day05.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 05", () => {
  const solution = new Day05Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 5);
    expect(solution.first(input)).toEqual(255);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 5);
    expect(solution.second(input)).toEqual(55);
  });
});
