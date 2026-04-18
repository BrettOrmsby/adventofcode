import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day25Year2016 } from "./day25.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 25", () => {
  const solution = new Day25Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 25);
    expect(solution.first(input)).toEqual(189);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 25);
    expect(solution.second(input)).toEqual(-1);
  });
});
