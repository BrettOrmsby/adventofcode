import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day10Year2016 } from "./day10.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 10", () => {
  const solution = new Day10Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 10);
    expect(solution.first(input)).toEqual(161);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 10);
    expect(solution.second(input)).toEqual(133163);
  });
});
