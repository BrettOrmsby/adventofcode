import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day25Year2015 } from "./day25.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 25", () => {
  const solution = new Day25Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 25);
    expect(solution.first(input)).toEqual(19980801);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 25);
    expect(solution.second(input)).toEqual(-1);
  });
});
