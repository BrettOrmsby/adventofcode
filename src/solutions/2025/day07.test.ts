import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day07Year2025 } from "./day07.ts";
import { loadInput } from "../../common/index.ts";

describe("2025 day 07", () => {
  const solution = new Day07Year2025();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2025, 7);
    expect(solution.first(input)).toEqual(1649);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2025, 7);
    expect(solution.second(input)).toEqual(16937871060075);
  });
});
