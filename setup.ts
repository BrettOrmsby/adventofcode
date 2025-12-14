import { exists } from "@std/fs/exists";
import { parse } from "@std/flags";

const { year, day } = parseArgs();
if (year === -1 || day === -1) {
  console.error("Invalid usage: deno task setup <year> <day>");
  Deno.exit(-1);
}
const normalizedDay = day.toString().padStart(2, "0");

const solutionPath = `./src/solutions/${year}/day${day
  .toString()
  .padStart(2, "0")}.ts`;
const testPath = `./src/solutions/${year}/day${day
  .toString()
  .padStart(2, "0")}.test.ts`;
const indexFile = `./src/solutions/${year}/index.ts`;

const solutionExists = await exists(solutionPath);
const testExists = await exists(testPath);
const indexFileExists = await exists(indexFile);

if (!solutionExists) {
  const encoder = new TextEncoder();
  const data =
    encoder.encode(`import type { Solution } from "../../common/index.ts";

export class Day${normalizedDay}Year${year} implements Solution {
    first(input: string): number {
        return -1;
    }
    
    second(input: string): number {
        return -1;
    }
}
`);
  Deno.writeFile(solutionPath, data);
  console.log("Created Solution");
} else {
  console.error("Error: Solution Exists");
}

if (!testExists) {
  const encoder = new TextEncoder();
  const data = encoder.encode(`import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Day${normalizedDay}Year${year} } from "./day${normalizedDay}.ts";
import { loadInput } from "../../common/index.ts";

describe("${year} day ${normalizedDay}", () => {
    const solution = new Day${normalizedDay}Year${year}();

    it("should be defined", () => {
        expect(solution).toBeDefined()
    })

    it("should solve first part", async () => {
        const input = await loadInput(${year}, ${day});
        expect(solution.first(input)).toEqual(-1)
    })

    it("should solve second part", async () => {
        const input = await loadInput(${year}, ${day});
        expect(solution.second(input)).toEqual(-1)
    })
})
`);
  Deno.writeFile(testPath, data);
  console.log("Created Test");
} else {
  console.error("Error: Test Exists");
}

if (indexFileExists && !solutionExists) {
  const encoder = new TextEncoder();
  const data = encoder.encode(`\nexport * from "./day${normalizedDay}.ts";`);
  Deno.writeFile(indexFile, data, { append: true });
  console.log("Added imports to index.ts file");
} else if (!indexFileExists) {
  console.error("Error: index.ts file does not exits");
} else {
  console.log("Solution exists, so imports are not added to index.ts");
}

console.log("Add solution to main.ts file");

interface CLIArguments {
  year: number;
  day: number;
}
function parseArgs(): CLIArguments {
  const args = Deno.args;

  const stringArgs = ["year", "day"];
  const alias = {
    year: "y",
    day: "d",
  };

  const parsedArgs = parse(args, {
    alias,
    string: stringArgs,
    stopEarly: false,
    "--": true,
  });

  const year = Number(parsedArgs._[0] || parsedArgs.year || -1);
  const day = Number(parsedArgs._[1] || parsedArgs.day || -1);
  return { year, day };
}
