import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day02Year2025 } from "./day02.ts";
import { loadInput } from "../../common/index.ts";

describe("2025 day 02", () => {
  const solution = new Day02Year2025();

  it("should be defined", () => {
    expect(solution).toBeDefined();
  });

  it("should solve first part", async () => {
    const input = await loadInput(2025, 2);
    expect(solution.first(input)).toEqual(18893502033);
  });

  it("should solve second part", async () => {
    const input = await loadInput(2025, 2);
    expect(solution.second(input)).toEqual(26202168557);
  });
});
