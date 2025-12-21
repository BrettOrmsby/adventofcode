import type { Solution } from "../../common/index.ts";

interface ReindeerSpeed {
  speed: number;
  flyTime: number;
  restTime: number;
}

interface ReindeerState {
  mode: "fly" | "rest";
  time: number;
  distance: number;
}

export class Day14Year2015 implements Solution {
  // Use a counted loop and keep track of the reindeer states individually as they
  // change each second
  first(input: string): number {
    const data = this.parseData(input);
    const states: Record<string, ReindeerState> = {};

    for (const reindeer of Object.keys(data)) {
      states[reindeer] = {
        mode: "fly",
        time: 0,
        distance: 0,
      };
    }

    for (let i = 0; i < 2503; i++) {
      for (const reindeer of Object.keys(data)) {
        const state = states[reindeer];
        if (state.mode === "fly") {
          state.time += 1;
          state.distance += data[reindeer].speed;
          if (state.time === data[reindeer].flyTime) {
            state.time = 0;
            state.mode = "rest";
          }
        } else {
          state.time += 1;
          if (state.time === data[reindeer].restTime) {
            state.time = 0;
            state.mode = "fly";
          }
        }
      }
    }

    return Math.max(
      ...Object.values(states).map((reindeer) => reindeer.distance)
    );
  }

  // Do the same as part 1, but instead keep track of points and add a point
  // to each reindeer at the furthest distance after each second
  second(input: string): number {
    const data = this.parseData(input);
    const states: Record<string, ReindeerState & { points: number }> = {};

    for (const reindeer of Object.keys(data)) {
      states[reindeer] = {
        mode: "fly",
        time: 0,
        distance: 0,
        points: 0,
      };
    }

    for (let i = 0; i < 2503; i++) {
      let maxDistance = 0;
      for (const reindeer of Object.keys(data)) {
        const state = states[reindeer];
        if (state.mode === "fly") {
          state.time += 1;
          state.distance += data[reindeer].speed;
          if (state.time === data[reindeer].flyTime) {
            state.time = 0;
            state.mode = "rest";
          }
        } else {
          state.time += 1;
          if (state.time === data[reindeer].restTime) {
            state.time = 0;
            state.mode = "fly";
          }
        }
        maxDistance = Math.max(maxDistance, state.distance);
      }
      for (const reindeer of Object.keys(data)) {
        if (states[reindeer].distance === maxDistance) {
          states[reindeer].points += 1;
        }
      }
    }

    return Math.max(
      ...Object.values(states).map((reindeer) => reindeer.points)
    );
  }

  private parseData(input: string): Record<string, ReindeerSpeed> {
    const data: Record<string, ReindeerSpeed> = {};
    for (const line of input.split("\n")) {
      const [_, name, speed, flyTime, restTime] = line.match(
        /^(.+?) can fly (\d+) .+? (\d+) .+? (\d+) .+?$/
      )!;
      data[name] = {
        speed: Number(speed),
        flyTime: Number(flyTime),
        restTime: Number(restTime),
      };
    }
    return data;
  }
}
