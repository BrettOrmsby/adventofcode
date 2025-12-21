import type { Solution } from "../../common/index.ts";

interface Ingredient {
  capacity: number;
  durability: number;
  flavour: number;
  texture: number;
  calories: number;
}

export class Day15Year2015 implements Solution {
  // Recursively loop through all options of ingredients and get the max
  // cookie score
  first(input: string): number {
    const ingredients = this.parseData(input);
    const ingredientCount = new Array(ingredients.length).fill(0);
    let max = 0;

    const recurse = (index: number, remaining: number) => {
      if (index === ingredients.length - 1) {
        ingredientCount[index] = remaining;
        max = Math.max(max, this.cookieScore(ingredientCount, ingredients));
        return;
      }

      for (let i = 0; i <= remaining; i++) {
        ingredientCount[index] = i;
        recurse(index + 1, remaining - i);
      }
    };

    recurse(0, 100);
    return max;
  }

  // Recursively loop through all options of ingredients and get the max
  // cookie score of ones with calories equal to 500
  second(input: string): number {
    const ingredients = this.parseData(input);
    const ingredientCount = new Array(ingredients.length).fill(0);
    let max = 0;

    const recurse = (index: number, remaining: number, calories: number) => {
      if (index === ingredients.length - 1) {
        ingredientCount[index] = remaining;
        const newCalories = calories + ingredients[index].calories * remaining;
        if (newCalories === 500)
          max = Math.max(max, this.cookieScore(ingredientCount, ingredients));
        return;
      }

      for (let i = 0; i <= remaining; i++) {
        ingredientCount[index] = i;
        recurse(
          index + 1,
          remaining - i,
          calories + i * ingredients[index].calories
        );
      }
    };

    recurse(0, 100, 0);
    return max;
  }

  private parseData(input: string): Ingredient[] {
    return input.split("\n").map((line: string): Ingredient => {
      const [_, capacity, durability, flavour, texture, calories] = line.match(
        /(-?\d+), .+? (-?\d+), .+? (-?\d+), .+? (-?\d+), .+? (-?\d+)/
      )!;
      return {
        capacity: Number(capacity),
        durability: Number(durability),
        flavour: Number(flavour),
        texture: Number(texture),
        calories: Number(calories),
      };
    });
  }

  private cookieScore(
    ingredientCounts: number[],
    ingredients: Ingredient[]
  ): number {
    const ingredientSums: Ingredient = {
      capacity: 0,
      durability: 0,
      flavour: 0,
      texture: 0,
      calories: 0,
    };
    for (let i = 0; i < ingredientCounts.length; i++) {
      for (const key in ingredients[0]) {
        ingredientSums[key as keyof Ingredient] +=
          ingredients[i][key as keyof Ingredient] * ingredientCounts[i];
      }
    }
    return (
      Math.max(ingredientSums.capacity, 0) *
      Math.max(ingredientSums.durability, 0) *
      Math.max(ingredientSums.flavour, 0) *
      Math.max(ingredientSums.texture, 0)
    );
  }
}
