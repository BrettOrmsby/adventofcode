import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day06Year2016 } from "./day06.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 06", () => {
  const solution = new Day06Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 6);
    expect(solution.first(input)).toEqual("dzqckwsd");
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 6);
    expect(solution.second(input)).toEqual("lragovly");
  });
});
