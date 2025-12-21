import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day15Year2015 } from "./day15.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 15", () => {
  const solution = new Day15Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 15);
    expect(solution.first(input)).toEqual(21367368);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 15);
    expect(solution.second(input)).toEqual(1766400);
  });
});
