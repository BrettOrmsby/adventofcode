import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day13Year2015 } from "./day13.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 13", () => {
  const solution = new Day13Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 13);
    expect(solution.first(input)).toEqual(709);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 13);
    expect(solution.second(input)).toEqual(668);
  });
});
