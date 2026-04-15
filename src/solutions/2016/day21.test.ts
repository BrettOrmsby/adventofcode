import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day21Year2016 } from "./day21.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 21", () => {
  const solution = new Day21Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 21);
    expect(solution.first(input)).toEqual("ghfacdbe");
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 21);
    expect(solution.second(input)).toEqual("fhgcdaeb");
  });
});
