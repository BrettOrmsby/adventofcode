import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day23Year2016 } from "./day23.ts";
import { loadInput } from "../../common/index.ts";

describe("2016 day 23", () => {
  const solution = new Day23Year2016();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2016, 23);
    expect(solution.first(input)).toEqual(13140);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2016, 23);
    expect(solution.second(input)).toEqual(479009700);
  });
});
