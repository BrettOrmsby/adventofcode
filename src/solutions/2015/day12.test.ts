import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day12Year2015 } from "./day12.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 12", () => {
  const solution = new Day12Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 12);
    expect(solution.first(input)).toEqual(156366);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 12);
    expect(solution.second(input)).toEqual(96852);
  });
});
