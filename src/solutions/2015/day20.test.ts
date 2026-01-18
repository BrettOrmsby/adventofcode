import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day20Year2015 } from "./day20.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 20", () => {
  const solution = new Day20Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 20);
    expect(solution.first(input)).toEqual(831600);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 20);
    expect(solution.second(input)).toEqual(884520);
  });
});
