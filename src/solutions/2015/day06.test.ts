import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day06Year2015 } from "./day06.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 06", () => {
  const solution = new Day06Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 6);
    expect(solution.first(input)).toEqual(400410);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 6);
    expect(solution.second(input)).toEqual(15343601);
  });
});
