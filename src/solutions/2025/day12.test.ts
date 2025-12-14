import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day12Year2025 } from "./day12.ts";
import { loadInput } from "../../common/index.ts";

describe("2025 day 12", () => {
  const solution = new Day12Year2025();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2025, 12);
    expect(solution.first(input)).toEqual(403);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2025, 12);
    expect(solution.second(input)).toEqual(1);
  });
});
