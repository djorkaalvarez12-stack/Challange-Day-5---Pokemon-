interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export class Pokemon {
  constructor(public name: string, public level: number, public stats: PokemonStats) {}
}