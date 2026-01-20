import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day23Year2015 } from "./day23.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 23", () => {
  const solution = new Day23Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 23);
    expect(solution.first(input)).toEqual(255);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 23);
    expect(solution.second(input)).toEqual(334);
  });
});
