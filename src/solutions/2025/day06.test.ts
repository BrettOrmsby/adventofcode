import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day06Year2025 } from "./day06.ts";
import { loadInput } from "../../common/index.ts";

describe("2025 day 06", () => {
  const solution = new Day06Year2025();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2025, 6);
    expect(solution.first(input)).toEqual(6371789547734);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2025, 6);
    expect(solution.second(input)).toEqual(11419862653216);
  });
});
