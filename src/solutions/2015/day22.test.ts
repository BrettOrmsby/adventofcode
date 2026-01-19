import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day22Year2015 } from "./day22.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 22", () => {
  const solution = new Day22Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 22);
    expect(solution.first(input)).toEqual(953);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 22);
    expect(solution.second(input)).toEqual(1289);
  });
});
