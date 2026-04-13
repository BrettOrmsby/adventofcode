import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day16Year2016 } from "./day16.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 16", () => {
  const solution = new Day16Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 16);
    expect(solution.first(input)).toEqual("10111110010110110");
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 16);
    expect(solution.second(input)).toEqual("01101100001100100");
  });
});
