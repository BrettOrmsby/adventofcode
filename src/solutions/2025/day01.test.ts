import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day01Year2025 } from "./day01.ts";
import { loadInput } from "../../common/index.ts";

describe("2025 day 01", () => {
  const solution = new Day01Year2025();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2025, 1);
    expect(solution.first(input)).toEqual(1097);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2025, 1);
    expect(solution.second(input)).toEqual(7101);
  });
});
