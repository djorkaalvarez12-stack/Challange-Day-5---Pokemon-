import fs from 'fs';

import { Pokemon } from '../models/Pokemon';
import path from 'path';

export class PokemonRepository {

  private readonly FILE_PATH = 'data/pokemon-list.json';
  private pokemonList: Pokemon[] = [];

  constructor() {
    this.pokemonList = this.loadFromFile();
  }

  private loadFromFile() {
    if(!fs.existsSync(this.FILE_PATH)){
      return [];
    }

      try {
      const fileContent = fs.readFileSync(this.FILE_PATH, 'utf-8');
      const data = JSON.parse(fileContent);

      const pokemons = data.map((p: any) => new Pokemon(p.name, p.level, p.stats));
      return pokemons;

    } catch (error) {
      return [];
    }

  }

  private saveToFile(){
    const dirPath = path.dirname(this.FILE_PATH);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const pokemonArray = this.pokemonList.map(Pokemon => ({  
      name: Pokemon.name,
      level: Pokemon.level,
      stats: Pokemon.stats

    }));

    fs.writeFileSync(this.FILE_PATH, JSON.stringify(pokemonArray, null, 2), 'utf-8');

  }

  getPokemonList() {
    return this.pokemonList;
  }

  addPokemon(pokemon: Pokemon) {
    console.log(`Adding pokemon: ${pokemon.name}`);
    this.pokemonList.push(pokemon);
    this.saveToFile();
  }
}