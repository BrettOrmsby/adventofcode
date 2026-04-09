import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day12Year2016 } from "./day12.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 12", () => {
  const solution = new Day12Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 12);
    expect(solution.first(input)).toEqual(318077);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 12);
    expect(solution.second(input)).toEqual(9227731);
  });
});
