import { join, dirname, fromFileUrl } from "@std/path";
import { Solution } from "./solution.ts";

export async function loadInput(year: number, day: number): Promise<string> {
  const dayFileName = `day${day.toString().padStart(2, "0")}.txt`;
  const __dirname = dirname(fromFileUrl(import.meta.url));
  const solutionPath = join(
    __dirname,
    "..",
    "..",
    "data",
    year.toString(),
    dayFileName,
  );
  return await Deno.readTextFile(solutionPath);
}

export async function loadSolution(year: number, day: number) {
  const dayFileName = `day${day.toString().padStart(2, "0")}.ts`;
  const __dirname = dirname(fromFileUrl(import.meta.url));
  const solutionPath = join(
    __dirname,
    "..",
    "solutions",
    year.toString(),
    dayFileName,
  );
  const dynamicImport = await import(solutionPath);
  const className = `Day${day.toString().padStart(2, "0")}Year${year}`;
  return new dynamicImport[className]() as Solution;
}
