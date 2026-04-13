import type { Solution } from "../../common/index.ts";

// Initially, this was solved with regular arrays,
// then I learned about the Uint8Array, which is a lot
// faster.
export class Day16Year2016 implements Solution {
  // Use a Uint8Array to manage the data. First run the dragon curve to loop and append
  // a zero then reversed and inversed bits while the size is too low. Then find the
  // checksum by recursively halving the input until it is an odd length.
  first(input: string): string {
    const part1 = this.dragonCurve(input, 272);
    return this.checkSum(part1);
  }

  // Do the same as part 1 but with a new length
  second(input: string): string {
    const part1 = this.dragonCurve(input, 35651584);
    return this.checkSum(part1);
  }

  private dragonCurve(input: string, length: number): Uint8Array {
    let arr = Uint8Array.from(input);

    while (arr.length < length) {
      const temp = new Uint8Array(arr.length * 2 + 1);
      temp.set(arr);
      temp[arr.length] = 0;
      for (let i = 0; i < arr.length; i++) {
        temp[temp.length - i - 1] = arr[i] ^ 1;
      }
      arr = temp;
    }

    return arr.slice(0, length);
  }

  private checkSum(data: Uint8Array): string {
    const result = new Uint8Array(data.length / 2);
    for (let i = 0; i < data.length; i += 2) {
      if (data[i] === data[i + 1]) {
        result[i / 2] = 1;
      } else {
        result[i / 2] = 0;
      }
    }

    if (result.length % 2 === 0) {
      return this.checkSum(result);
    }
    return result.join("");
  }
}
