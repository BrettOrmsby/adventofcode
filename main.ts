import { parse } from "@std/flags";
import { loadInput, loadSolution } from "./src/common/index.ts";
import { Solution } from "./src/common/solution.ts";

const { year, day } = parseArgs();
run(year, day);

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

  const year = Number(parsedArgs._[0] || parsedArgs.year || 0);
  const day = Number(parsedArgs._[1] || parsedArgs.day || -1);

  return { year, day };
}

async function run(year: number, day: number) {
  console.log(`Running solution for year ${year} day ${day}`);
  const input = await loadInput(year, day);
  let daySolution: Solution | null = null;
  try {
    daySolution = await loadSolution(year, day);
  } catch {
    console.log(`The challenge ${year} day ${day} does not exist.`);
    Deno.exit(0);
  }

  console.time("first");
  console.log(daySolution.first(input));
  console.timeEnd("first");

  console.time("second");
  console.log(daySolution.second(input));
  console.timeEnd("second");
}
