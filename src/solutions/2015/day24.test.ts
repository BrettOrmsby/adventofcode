import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day24Year2015 } from "./day24.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 24", () => {
  const solution = new Day24Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 24);
    expect(solution.first(input)).toEqual(10439961859);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 24);
    expect(solution.second(input)).toEqual(72050269);
  });
});
