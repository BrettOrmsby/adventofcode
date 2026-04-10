import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day13Year2016 } from "./day13.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 13", () => {
  const solution = new Day13Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 13);
    expect(solution.first(input)).toEqual(86);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 13);
    expect(solution.second(input)).toEqual(127);
  });
});
