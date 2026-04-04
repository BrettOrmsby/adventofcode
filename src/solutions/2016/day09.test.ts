import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day09Year2016 } from "./day09.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 09", () => {
  const solution = new Day09Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 9);
    expect(solution.first(input)).toEqual(138735);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 9);
    expect(solution.second(input)).toEqual(11125026826);
  });
});
