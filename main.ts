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
    7: new solutions.Day07Year2015(),
    8: new solutions.Day08Year2015(),
    9: new solutions.Day09Year2015(),
    10: new solutions.Day10Year2015(),
    11: new solutions.Day11Year2015(),
    12: new solutions.Day12Year2015(),
    13: new solutions.Day13Year2015(),
    14: new solutions.Day14Year2015(),
    15: new solutions.Day15Year2015(),
    16: new solutions.Day16Year2015(),
    17: new solutions.Day17Year2015(),
    18: new solutions.Day18Year2015(),
    19: new solutions.Day19Year2015(),
    20: new solutions.Day20Year2015(),
    21: new solutions.Day21Year2015(),
    22: new solutions.Day22Year2015(),
    23: new solutions.Day23Year2015(),
    24: new solutions.Day24Year2015(),
    25: new solutions.Day25Year2015(),
  },
  2016: {
    1: new solutions.Day01Year2016(),
    2: new solutions.Day02Year2016(),
    3: new solutions.Day03Year2016(),
    4: new solutions.Day04Year2016(),
    5: new solutions.Day05Year2016(),
    6: new solutions.Day06Year2016(),
    7: new solutions.Day07Year2016(),
    8: new solutions.Day08Year2016(),
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
