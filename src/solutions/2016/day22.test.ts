import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day22Year2016 } from "./day22.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 22", () => {
  const solution = new Day22Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 22);
    expect(solution.first(input)).toEqual(985);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 22);
    expect(solution.second(input)).toEqual(179);
  });
});
