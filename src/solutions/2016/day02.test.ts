import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day02Year2016 } from "./day02.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 02", () => {
  const solution = new Day02Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 2);
    expect(solution.first(input)).toEqual("76792");
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 2);
    expect(solution.second(input)).toEqual("A7AC3");
  });
});
