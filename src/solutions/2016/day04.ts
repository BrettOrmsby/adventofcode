import type { Solution } from "../../common/index.ts";

interface Room {
  name: string;
  sectorId: number;
  checksum: string;
}

export class Day04Year2016 implements Solution {
  // Repeat through all rooms and count the occurrence of each character
  // in the name. Then sort the occurrences first by count descending then
  // by character code ascending. Combine the first 5 letters and see if that
  // equals the room checksum.
  first(input: string): number {
    const rooms = this.parseData(input);

    let sectorSums = 0;
    for (const room of rooms) {
      const characterCounts = new Map<string, number>();
      for (const character of room.name) {
        if (character === "-") continue;
        characterCounts.set(
          character,
          1 + (characterCounts.get(character) ?? 0),
        );
      }

      const sortedCharacterCounts = characterCounts
        .entries()
        .toArray()
        .sort(([aLetter, aCount], [bLetter, bCount]) => {
          if (aCount !== bCount) {
            return bCount - aCount;
          }
          return aLetter.charCodeAt(0) - bLetter.charCodeAt(0);
        });

      const checksum = sortedCharacterCounts
        .slice(0, 5)
        .map(([letter, _count]) => letter)
        .join("");

      if (checksum === room.checksum) {
        sectorSums += room.sectorId;
      }
    }
    return sectorSums;
  }

  // Repeat through the rooms and through each character of the room name,
  // converting hyphens to spaces, or shifting the letter using its char code.
  // Then check for the deciphered room name "northpole object storage"
  second(input: string): number {
    const LOWER_A = "a".charCodeAt(0);
    const rooms = this.parseData(input);

    for (const room of rooms) {
      const decipheredName = room.name
        .split("")
        .map((char) => {
          if (char === "-") return " ";
          return String.fromCharCode(
            LOWER_A + ((char.charCodeAt(0) - LOWER_A + room.sectorId) % 26),
          );
        })
        .join("");
      if (decipheredName === "northpole object storage") return room.sectorId;
    }
    return -1;
  }

  private parseData(input: string): Room[] {
    return input.split("\n").map((line) => {
      const [_, roomName, sectorId, checksum] = line.match(
        /^([a-z\-]*?)-(\d+)\[([a-z]{5})\]$/,
      )!;
      return { name: roomName, sectorId: parseInt(sectorId), checksum };
    });
  }
}
