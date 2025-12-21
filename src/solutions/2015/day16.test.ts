import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day16Year2015 } from "./day16.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 16", () => {
  const solution = new Day16Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 16);
    expect(solution.first(input)).toEqual(213);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 16);
    expect(solution.second(input)).toEqual(323);
  });
});
