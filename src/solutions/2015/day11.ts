import type { Solution } from "../../common/index.ts";

export class Day11Year2015 implements Solution {
  // Brute force password incrementing until we find a valid password
  first(input: string): string {
    let password = this.incrementPassword(input);
    while (!this.isValidPassword(password)) {
      password = this.incrementPassword(password);
    }
    return password;
  }

  // Run part one twice
  second(input: string): string {
    const firstPassword = this.first(input);
    return this.first(firstPassword);
  }

  private isValidPassword(password: string): boolean {
    let hasRunOf3 = false;
    let hasTwoDifferentDoubles = false;
    let prevDouble = "";
    for (let i = 0; i < password.length; i++) {
      if (["i", "o", "l"].includes(password[i])) return false;
      if (i > 0 && password[i - 1] === password[i]) {
        if (prevDouble != password[i] && prevDouble != "") {
          hasTwoDifferentDoubles = true;
        } else {
          prevDouble = password[i];
        }
      }
      if (
        i > 1 &&
        password.charCodeAt(i - 2) === password.charCodeAt(i - 1) - 1 &&
        password.charCodeAt(i - 2) === password.charCodeAt(i) - 2
      ) {
        hasRunOf3 = true;
      }
    }
    return hasRunOf3 && hasTwoDifferentDoubles;
  }

  private incrementPassword(password: string) {
    for (let i = password.length - 1; i >= 0; i--) {
      const replaceIndex = (str: string, char: string, i: number) =>
        str.slice(0, i) + char + str.slice(i + 1);
      const newChar = String.fromCharCode(password.charCodeAt(i) + 1);
      if (newChar > "z") {
        password = replaceIndex(password, "a", i);
      } else {
        password = replaceIndex(password, newChar, i);
        break;
      }
    }
    return password;
  }
}
