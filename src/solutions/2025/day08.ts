import type { Solution } from "../../common/index.ts";

export class Day08Year2025 implements Solution {
  first(input: string): number {
    const toNums = (line: string) => line.split(",").map(Number);
    const distance = (line1: string, line2: string) => {
      const [x1, y1, z1] = toNums(line1);
      const [x2, y2, z2] = toNums(line2);
      return Math.sqrt(
        Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)
      );
    };

    const boxes = input.split("\n");

    const orderedPairs: { box: string; connection: string; dist: number }[] =
      [];
    for (let i = 0; i < boxes.length - 1; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        orderedPairs.push({
          box: boxes[i],
          connection: boxes[j],
          dist: distance(boxes[i], boxes[j]),
        });
      }
    }
    orderedPairs.sort((a, b) => a.dist - b.dist);

    const connections: Record<string, number> = {};

    let i = 0;
    let connectionCount = 0;
    while (connectionCount < 1000 && i < orderedPairs.length) {
      const { box, connection } = orderedPairs[i];

      if (box in connections) {
        if (connection in connections) {
          // need to merge connections
          const swapID = connections[connection];
          for (const key in connections) {
            if (connections[key] == swapID) {
              connections[key] = connections[box];
            }
          }
        } else {
          connections[connection] = connections[box];
        }
      } else if (connection in connections) {
        connections[box] = connections[connection];
      } else {
        connections[box] = connectionCount;
        connections[connection] = connectionCount;
      }

      connectionCount += 1;
      i += 1;
    }

    // Now lets count sizes of the connections
    const connectionChains = Object.values(connections).reduce(
      (map: Record<string, number>, id: number) => {
        if (id in map) {
          map[id] += 1;
        } else {
          map[id] = 1;
        }
        return map;
      },
      {}
    );

    // Now we sort the connections to get the max 3
    const maxConnections = Object.values(connectionChains).sort(
      (a, b) => b - a
    );

    const result = maxConnections[0] * maxConnections[1] * maxConnections[2];
    return result;
  }

  second(input: string): number {
    const toNums = (line: string) => line.split(",").map(Number);
    const distance = (line1: string, line2: string) => {
      const [x1, y1, z1] = toNums(line1);
      const [x2, y2, z2] = toNums(line2);
      return Math.sqrt(
        Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)
      );
    };

    const boxes = input.split("\n");

    const orderedPairs: { box: string; connection: string; dist: number }[] =
      [];
    for (let i = 0; i < boxes.length - 1; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        orderedPairs.push({
          box: boxes[i],
          connection: boxes[j],
          dist: distance(boxes[i], boxes[j]),
        });
      }
    }
    orderedPairs.sort((a, b) => a.dist - b.dist);

    const connections: Record<string, number> = {};

    let i = 0;
    let connectionCount = 0;
    while (i < orderedPairs.length) {
      const { box, connection } = orderedPairs[i];

      if (box in connections) {
        if (connection in connections) {
          // need to merge connections
          const swapID = connections[connection];
          for (const key in connections) {
            if (connections[key] == swapID) {
              connections[key] = connections[box];
            }
          }
        } else {
          connections[connection] = connections[box];
        }
      } else if (connection in connections) {
        connections[box] = connections[connection];
      } else {
        connections[box] = connectionCount;
        connections[connection] = connectionCount;
      }

      const chains = Object.values(connections);
      if (
        chains.length == boxes.length &&
        chains.every((link) => link == chains[0])
      ) {
        const [x, ..._] = toNums(box);
        const [x2, ...__] = toNums(connection);
        return x * x2;
      }

      connectionCount += 1;
      i += 1;
    }
    return -1;
  }
}
