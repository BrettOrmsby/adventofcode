import type { Solution } from "../../common/index.ts";
import { hash } from "node:crypto";

interface QueueItem {
  index: number;
  isKey: boolean;
  charSequence: string;
}

export class Day14Year2016 implements Solution {
  // Maintain a 1000-sized queue of potential keys. Keep looping and incrementing the
  // hash index until the 64th key is found. In each iteration, get the hash, then check
  // if it has 3 of a character in a row using regex backreferences. If it does, check the
  // queue to see if it contains 5 of a character to match any past possible key. Then get
  // the queue item to be removed and if it is a complete key, increment the keys found and
  // if it is equal to 64, return that key's index. Then, add the new item to the que or null
  // if it does not have any repeating character.
  first(input: string): number {
    return this.getKey64(input, 1);
  }

  // Do the same as part 1, but hash the input 2017 times
  second(input: string): number {
    return this.getKey64(input, 2017);
  }

  private getKey64(input: string, numHashes = 1): number {
    const queue: (QueueItem | null)[] = new Array(1000).fill(null);
    let qStart = 0;

    let i = 0;
    let keyNumber = 0;
    while (keyNumber < 64) {
      let newQueItem: null | QueueItem = null;

      let md5Hash = input + i;
      for (let j = 0; j < numHashes; j++) md5Hash = this.md5(md5Hash);
      const match = md5Hash.match(/(.)\1\1/);

      if (match) {
        // Update queue of possible keys for if the hash has any of the 5 repeated characters
        for (let i = 0; i < queue.length; i++) {
          const item = queue[(qStart + i) % queue.length];
          if (item && !item.isKey && md5Hash.includes(item.charSequence)) {
            item.isKey = true;
          }
        }

        const char = match[1];
        newQueItem = {
          index: i,
          charSequence: char.repeat(5),
          isKey: false,
        };
      }

      if (queue[qStart]?.isKey) {
        keyNumber += 1;
        if (keyNumber === 64) return queue[qStart]!.index;
      }
      queue[qStart] = newQueItem;
      qStart = (qStart + 1) % queue.length;
      i++;
    }

    return -1;
  }

  private md5(input: string) {
    return hash("MD5", input);
  }
}
