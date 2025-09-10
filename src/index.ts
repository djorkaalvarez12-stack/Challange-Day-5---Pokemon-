// src/index.ts
import { Pokemon } from './models/Pokemon';
import { PokemonRepository } from './repositories/PokemonRepository';
import { PokemonService } from './services/PokemonService';

const DEFAULT_POKEMONS = {
  bulbasaur: new Pokemon('bulbasaur', 96, { hp: 95, attack: 65, defense: 90, speed: 70 }),
  charmander: new Pokemon('charmander', 79, { hp: 78, attack: 95, defense: 82, speed: 88 }),
  squirtle: new Pokemon('squirtle', 64, { hp: 78, attack: 75, defense: 68, speed: 65 }),
  pikachu: new Pokemon('pikachu', 81, { hp: 85, attack: 110, defense: 75, speed: 120 }),
  mewtwo: new Pokemon('mewtwo', 100, { hp: 106, attack: 130, defense: 90, speed: 130 }),
  dragonite: new Pokemon('dragonite', 88, { hp: 91, attack: 134, defense: 95, speed: 80 })
};

const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);

function main() {
  pokemonRepository.addPokemon(DEFAULT_POKEMONS.bulbasaur);
  pokemonRepository.addPokemon(DEFAULT_POKEMONS.charmander);
  pokemonRepository.addPokemon(DEFAULT_POKEMONS.pikachu);

  const averageLevel = pokemonService.getAverageLevel();
  const fastestPokemon = pokemonService.getFastestPokemon();
  if (averageLevel < 80) throw new Error("Average level is less than 80");
  console.log("Average level: ", averageLevel);
  console.log("Fastest pokemon: ", fastestPokemon);
}

main();
