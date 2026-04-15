import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day20Year2016 } from "./day20.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 20", () => {
  const solution = new Day20Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 20);
    expect(solution.first(input)).toEqual(22887907);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 20);
    expect(solution.second(input)).toEqual(109);
  });
});
