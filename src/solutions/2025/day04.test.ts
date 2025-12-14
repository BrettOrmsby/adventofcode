import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day04Year2025 } from "./day04.ts";
import { loadInput } from "../../common/index.ts";

describe("2025 day 04", () => {
  const solution = new Day04Year2025();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2025, 4);
    expect(solution.first(input)).toEqual(1553);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2025, 4);
    expect(solution.second(input)).toEqual(8442);
  });
});
