import { Pokemon } from '../models/Pokemon';

export class PokemonRepository {
  private pokemonList: Pokemon[] = [];

  getPokemonList() {
    return this.pokemonList;
  }

  addPokemon(pokemon: Pokemon) {
    console.log(`Adding pokemon: ${pokemon.name}`);
    this.pokemonList.push(pokemon);
  }
}