import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day09Year2015 } from "./day09.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 09", () => {
  const solution = new Day09Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 9);
    expect(solution.first(input)).toEqual(141);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 9);
    expect(solution.second(input)).toEqual(736);
  });
});
