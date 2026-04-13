import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day18Year2016 } from "./day18.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 18", () => {
  const solution = new Day18Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 18);
    expect(solution.first(input)).toEqual(2035);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 18);
    expect(solution.second(input)).toEqual(20000577);
  });
});
