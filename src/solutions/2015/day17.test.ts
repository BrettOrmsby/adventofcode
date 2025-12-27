import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day17Year2015 } from "./day17.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 17", () => {
  const solution = new Day17Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 17);
    expect(solution.first(input)).toEqual(654);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 17);
    expect(solution.second(input)).toEqual(57);
  });
});
