import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day01Year2015 } from "./day01.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 01", () => {
  const solution = new Day01Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 1);
    expect(solution.first(input)).toEqual(138);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 1);
    expect(solution.second(input)).toEqual(1771);
  });
});
