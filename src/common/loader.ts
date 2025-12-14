import { join, dirname, fromFileUrl } from "@std/path";

export async function loadInput(year: number, day: number): Promise<string> {
  const dayFileName = `day${day.toString().padStart(2, "0")}.txt`;
  const __dirname = dirname(fromFileUrl(import.meta.url));
  const solutionPath = join(
    __dirname,
    "..",
    "..",
    "data",
    year.toString(),
    dayFileName
  );
  return await Deno.readTextFile(solutionPath);
}
