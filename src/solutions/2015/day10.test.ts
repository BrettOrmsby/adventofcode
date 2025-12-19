import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day10Year2015 } from "./day10.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 10", () => {
  const solution = new Day10Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 10);
    expect(solution.first(input)).toEqual(492982);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 10);
    expect(solution.second(input)).toEqual(6989950);
  });
});
