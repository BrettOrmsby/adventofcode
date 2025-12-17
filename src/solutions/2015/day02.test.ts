import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day02Year2015 } from "./day02.ts";
import { loadInput } from "../../common/index.ts";

describe("2015 day 02", () => {
  const solution = new Day02Year2015();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2015, 2);
    expect(solution.first(input)).toEqual(1606483);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2015, 2);
    expect(solution.second(input)).toEqual(3842356);
  });
});
