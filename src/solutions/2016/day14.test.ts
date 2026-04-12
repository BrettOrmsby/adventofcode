import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day14Year2016 } from "./day14.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 14", () => {
  const solution = new Day14Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 14);
    expect(solution.first(input)).toEqual(25427);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 14);
    expect(solution.second(input)).toEqual(22045);
  });
});
