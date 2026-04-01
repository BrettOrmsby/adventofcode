import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day05Year2016 } from "./day05.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 05", () => {
  const solution = new Day05Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 5);
    expect(solution.first(input)).toEqual("801b56a7");
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 5);
    expect(solution.second(input)).toEqual("424a0197");
  });
});
