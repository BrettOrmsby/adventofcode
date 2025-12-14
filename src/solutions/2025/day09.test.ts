import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day09Year2025 } from "./day09.ts";
import { loadInput } from "../../common/index.ts";

describe("2025 day 09", () => {
  const solution = new Day09Year2025();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2025, 9);
    expect(solution.first(input)).toEqual(4715966250);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2025, 9);
    expect(solution.second(input)).toEqual(1530527040);
  });
});
