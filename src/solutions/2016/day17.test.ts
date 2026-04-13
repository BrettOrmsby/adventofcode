import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day17Year2016 } from "./day17.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 17", () => {
  const solution = new Day17Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 17);
    expect(solution.first(input)).toEqual("RDURRDDLRD");
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 17);
    expect(solution.second(input)).toEqual(526);
  });
});
