interface PokemonInfo {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export class PokeAPIAdapter {
  async getPokemonInfo(pokemonName: string): Promise<PokemonInfo> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    const response = await fetch(url);

    if(!response.ok){
      throw new Error('Error, no se pudo obteneter la información');
    }

    const data = await response.json();
    const stats = new Map<string, number>();
    
    for(let i=0; i< data.stats.length; i++){
      const s = data.stats[i];
      stats.set(s.stat.name, s.base_stat);
    }

    return {
      name: data.name,
      hp: stats.get("hp") ?? 0,
      attack: stats.get("attack") ?? 0,
      defense: stats.get("defense") ?? 0,
      speed: stats.get("speed") ?? 0,
    };

  }
}