import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day08Year2025 } from "./day08.ts";
import { loadInput } from "../../common/index.ts";

describe("2025 day 08", () => {
  const solution = new Day08Year2025();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2025, 8);
    expect(solution.first(input)).toEqual(42840);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2025, 8);
    expect(solution.second(input)).toEqual(170629052);
  });
});
