import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day01Year2016 } from "./day01.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 01", () => {
  const solution = new Day01Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 1);
    expect(solution.first(input)).toEqual(279);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 1);
    expect(solution.second(input)).toEqual(163);
  });
});
