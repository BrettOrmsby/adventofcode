import type { Solution } from "../../common/index.ts";

interface Boss {
  hit: number;
  damage: number;
}

type Effect = "shield" | "poison" | "recharge";

interface Player {
  hit: number;
  mana: number;
  effect: Record<Effect, number>;
}

type BattleResult = "lose" | "win" | "ok";

interface Spell {
  mana: number;
  handler(player: Player, boss: Boss): void;
  effect?: Effect;
}

const spells: Record<string, Spell> = {
  missile: {
    mana: 53,
    handler(_player: Player, boss: Boss) {
      boss.hit -= 4;
    },
  },
  drain: {
    mana: 73,
    handler(player: Player, boss: Boss) {
      player.hit += 2;
      boss.hit -= 2;
    },
  },
  shield: {
    mana: 113,
    handler(player: Player, _boss: Boss) {
      player.effect.shield = 6;
    },
    effect: "shield",
  },
  poison: {
    mana: 173,
    handler(player: Player, _boss: Boss) {
      player.effect.poison = 6;
    },
    effect: "poison",
  },
  recharge: {
    mana: 229,
    handler(player: Player, _boss: Boss) {
      player.effect.recharge = 5;
    },
    effect: "recharge",
  },
};

export class Day22Year2015 implements Solution {
  // Brute force all spell orders until someone dies (or can't use a spell) and look for the minimum
  // mana used over these iterations
  first(input: string): number {
    const boss = this.parseData(input);
    const player: Player = {
      hit: 50,
      mana: 500,
      effect: {
        shield: 0,
        poison: 0,
        recharge: 0,
      },
    };

    return this.findMinMana(player, boss, false, false);
  }

  // Do the exact same as part 1, but with the added condition of losing 1HP per tern
  second(input: string): number {
    const boss = this.parseData(input);
    const player: Player = {
      hit: 50,
      mana: 500,
      effect: {
        shield: 0,
        poison: 0,
        recharge: 0,
      },
    };

    return this.findMinMana(player, boss, true, false);
  }

  private parseData(input: string): Boss {
    const [hit, damage] = input
      .matchAll(/\d+/g)
      .map((match) => parseInt(match[0]));
    const boss: Boss = {
      hit,
      damage,
    };
    return boss;
  }

  private createPlayerCopy = (player: Player): Player => ({
    ...player,
    effect: { ...player.effect },
  });
  private createBossCopy = (boss: Boss): Boss => ({ ...boss });

  // Here is the recursive function which minimizes the mana usage while winning
  private findMinMana = (
    player: Player,
    boss: Boss,
    isPart2: boolean,
    bossAttack = true, // Since it does not attack on the first round
    memory = new Map<string, number>(),
  ): number => {
    const memKey = `${JSON.stringify(player)}|${JSON.stringify(boss)}`;
    if (memory.has(memKey)) return memory.get(memKey)!;
    if (boss.hit <= 0) return 0;

    // Boss turn if it is not the first round
    if (bossAttack) {
      const result = this.bossTurn(player, boss);
      switch (result) {
        case "lose":
          return Infinity;
        case "win":
          return 0;
        case "ok":
      }
    }

    // Player Turn
    if (isPart2) player.hit -= 1;
    if (player.hit <= 0) return Infinity;

    if (player.effect.shield) {
      player.effect.shield -= 1;
    }
    if (player.effect.poison) {
      player.effect.poison -= 1;
      boss.hit -= 3;
      if (boss.hit <= 0) return 0;
    }
    if (player.effect.recharge) {
      player.effect.recharge -= 1;
      player.mana += 101;
    }

    // Player attacks
    let minCost = Infinity;
    for (const spell of Object.values(spells)) {
      if (player.mana >= spell.mana) {
        if (spell.effect && player.effect[spell.effect] > 0) continue;
        const newPlayer = this.createPlayerCopy(player);
        const newBoss = this.createBossCopy(boss);
        newPlayer.mana -= spell.mana;
        spell.handler(newPlayer, newBoss);
        minCost = Math.min(
          minCost,
          spell.mana +
            this.findMinMana(newPlayer, newBoss, isPart2, true, memory),
        );
      }
    }

    memory.set(memKey, minCost);
    return minCost;
  };

  private bossTurn(player: Player, boss: Boss): BattleResult {
    let hasShield = false;
    if (player.effect.shield) {
      player.effect.shield -= 1;
      hasShield = true;
    }
    if (player.effect.poison) {
      player.effect.poison -= 1;
      boss.hit -= 3;
      if (boss.hit <= 0) return "win";
    }
    if (player.effect.recharge) {
      player.effect.recharge -= 1;
      player.mana += 101;
    }
    if (hasShield) {
      player.hit -= Math.max(1, boss.damage - 7);
    } else {
      player.hit -= boss.damage;
    }
    if (player.hit <= 0) return "lose";
    return "ok";
  }
}
