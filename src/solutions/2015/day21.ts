import type { Solution } from "../../common/index.ts";

interface Fighter {
  hit: number;
  damage: number;
  armour: number;
}

interface Item {
  cost: number;
  damage: number;
  armour: number;
}

interface Shop {
  weapons: Item[];
  armour: Item[];
  rings: Item[];
}

interface Data {
  shop: Shop;
  boss: Fighter;
}

export class Day21Year2015 implements Solution {
  // Brute force all possibilities and check successful ones for the lowest cost
  first(input: string): number {
    const { boss, shop } = this.parseData(input);
    shop.armour.push({ armour: 0, cost: 0, damage: 0 }); // Since you can buy no armour
    const ringCombinations = this.computeRingCombinations(shop.rings);

    let minCost = Infinity;
    for (const sword of shop.weapons) {
      for (const armour of shop.armour) {
        for (const ring of ringCombinations) {
          const item = this.mergeItems(sword, armour, ring);
          const player: Fighter = {
            hit: 100,
            damage: item.damage,
            armour: item.armour,
          };
          if (this.simulateFight(player, boss)) {
            minCost = Math.min(minCost, item.cost);
          }
        }
      }
    }
    return minCost;
  }

  // Do the same, but check for losses and the max cost of them
  second(input: string): number {
    const { boss, shop } = this.parseData(input);
    shop.armour.push({ armour: 0, cost: 0, damage: 0 });
    const ringCombinations = this.computeRingCombinations(shop.rings);

    let maxCost = 0;
    for (const sword of shop.weapons) {
      for (const armour of shop.armour) {
        for (const ring of ringCombinations) {
          const item = this.mergeItems(sword, armour, ring);
          const player: Fighter = {
            hit: 100,
            damage: item.damage,
            armour: item.armour,
          };
          if (!this.simulateFight(player, boss)) {
            maxCost = Math.max(maxCost, item.cost);
          }
        }
      }
    }
    return maxCost;
  }

  // Sum multiple items together
  mergeItems(...items: Item[]): Item {
    if (items.length === 0) return { armour: 0, cost: 0, damage: 0 };
    const mergedResult: Item = { ...items[0] };
    for (let i = 1; i < items.length; i++) {
      mergedResult.damage += items[i].damage;
      mergedResult.armour += items[i].armour;
      mergedResult.cost += items[i].cost;
    }
    return mergedResult;
  }

  // Get all combinations of 0-2 rings
  computeRingCombinations(rings: Item[]): Item[] {
    const ringCombinations: Item[] = [
      { armour: 0, cost: 0, damage: 0 },
      ...rings,
    ];
    for (let i = 0; i < rings.length - 1; i++) {
      for (let j = i + 1; j < rings.length; j++) {
        ringCombinations.push(this.mergeItems(rings[i], rings[j]));
      }
    }
    return ringCombinations;
  }

  // Check who wins in a fight
  simulateFight(you: Fighter, enemy: Fighter): boolean {
    const player = { ...you };
    const boss = { ...enemy };
    while (true) {
      boss.hit -= Math.max(1, player.damage - boss.armour);
      if (boss.hit <= 0) return true;
      player.hit -= Math.max(1, boss.damage - player.armour);
      if (player.hit <= 0) return false;
    }
  }

  parseData(input: string): Data {
    const [hit, damage, armour] = input
      .matchAll(/\d+/g)
      .map((match) => parseInt(match[0]));
    const boss: Fighter = {
      hit,
      damage,
      armour,
    };
    const shop: Shop = {
      weapons: [
        { cost: 8, damage: 4, armour: 0 },
        { cost: 10, damage: 5, armour: 0 },
        { cost: 25, damage: 6, armour: 0 },
        { cost: 40, damage: 7, armour: 0 },
        { cost: 74, damage: 8, armour: 0 },
      ],
      armour: [
        { cost: 13, damage: 0, armour: 1 },
        { cost: 31, damage: 0, armour: 2 },
        { cost: 53, damage: 0, armour: 3 },
        { cost: 75, damage: 0, armour: 4 },
        { cost: 102, damage: 0, armour: 5 },
      ],
      rings: [
        { cost: 25, damage: 1, armour: 0 },
        { cost: 50, damage: 2, armour: 0 },
        { cost: 100, damage: 3, armour: 0 },
        { cost: 20, damage: 0, armour: 1 },
        { cost: 40, damage: 0, armour: 2 },
        { cost: 80, damage: 0, armour: 3 },
      ],
    };

    return { boss, shop };
  }
}
