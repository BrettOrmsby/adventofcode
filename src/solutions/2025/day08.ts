import type { Solution } from "../../common/index.ts";

interface BoxPair {
  box: string;
  connection: string;
  dist: number;
}

export class Day08Year2025 implements Solution {
  // Start by calculating the distance between all distinct pairs of boxes and sorting it.
  // Then we go through the boxes to form 1000 connections. If multiple chains are connected
  // together, then we need to merge them. Finally, we count the sizes of the chains.
  first(input: string): number {
    const boxes = input.split("\n");

    const orderedPairs: BoxPair[] = [];
    for (let i = 0; i < boxes.length - 1; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        orderedPairs.push({
          box: boxes[i],
          connection: boxes[j],
          dist: this.distanceBetween(boxes[i], boxes[j]),
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

  // We do the exact same thing as part 1, but repeat until everything
  // is connected
  second(input: string): number {
    const boxes = input.split("\n");

    const orderedPairs: BoxPair[] = [];
    for (let i = 0; i < boxes.length - 1; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        orderedPairs.push({
          box: boxes[i],
          connection: boxes[j],
          dist: this.distanceBetween(boxes[i], boxes[j]),
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
        const [x, ..._] = this.toNums(box);
        const [x2, ...__] = this.toNums(connection);
        return x * x2;
      }

      connectionCount += 1;
      i += 1;
    }
    return -1;
  }

  private toNums(line: string) {
    return line.split(",").map(Number);
  }
  private distanceBetween(line1: string, line2: string) {
    const [x1, y1, z1] = this.toNums(line1);
    const [x2, y2, z2] = this.toNums(line2);
    return Math.sqrt(
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)
    );
  }
}
