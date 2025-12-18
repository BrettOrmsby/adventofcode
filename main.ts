import { parse } from "@std/flags";
import { loadInput, type Solution } from "./src/common/index.ts";
import * as solutions from "./src/solutions/index.ts";

const SOLUTIONS: Record<number, Record<number, Solution>> = {
  2015: {
    1: new solutions.Day01Year2015(),
    2: new solutions.Day02Year2015(),
    3: new solutions.Day03Year2015(),
    4: new solutions.Day04Year2015(),
    5: new solutions.Day05Year2015(),
    6: new solutions.Day06Year2015(),
  },
  2025: {
    1: new solutions.Day01Year2025(),
    2: new solutions.Day02Year2025(),
    3: new solutions.Day03Year2025(),
    4: new solutions.Day04Year2025(),
    5: new solutions.Day05Year2025(),
    6: new solutions.Day06Year2025(),
    7: new solutions.Day07Year2025(),
    8: new solutions.Day08Year2025(),
    9: new solutions.Day09Year2025(),
    10: new solutions.Day10Year2025(),
    11: new solutions.Day11Year2025(),
    12: new solutions.Day12Year2025(),
  },
};

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

  if (!Object.hasOwn(SOLUTIONS, year)) {
    console.error("Invalid Year");
    Deno.exit(1);
  }

  return { year, day };
}

async function run(year: number, day: number) {
  if (day === -1) {
    console.log(`Running ${year} Suit`);
    console.time("Total Time");
    for (const day in SOLUTIONS[year]) {
      const input = await loadInput(year, Number(day));
      const daySolution = SOLUTIONS[year][day];
      daySolution.first(input);
      daySolution.second(input);
    }
    console.timeEnd("Total Time");
    return;
  }

  console.log(`Running solution for year ${year} day ${day}`);
  const input = await loadInput(year, day);
  const daySolution = SOLUTIONS[year][day];

  console.time("first");
  console.log(daySolution.first(input));
  console.timeEnd("first");

  console.time("second");
  console.log(daySolution.second(input));
  console.timeEnd("second");
}
