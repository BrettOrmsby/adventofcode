import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day04Year2016 } from "./day04.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 04", () => {
  const solution = new Day04Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 4);
    expect(solution.first(input)).toEqual(173787);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 4);
    expect(solution.second(input)).toEqual(548);
  });
});
