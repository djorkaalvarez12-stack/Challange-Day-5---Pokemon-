import { Pokemon } from './models/Pokemon';
import { PokemonRepository } from './repositories/PokemonRepository';
import { PokemonService } from './services/PokemonService';

const DEFAULT_POKEMONS: Record<string, Pokemon> = {
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
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
   case 'add': {

    const pokemonName = args[1];
    if(!pokemonName){
      console.error('POR FAVOR INGRESA UN NOMBRE DE POKEMÓN');
      break;
    }

    const pokemonAdd = DEFAULT_POKEMONS[pokemonName.toLowerCase()];
    if(!pokemonAdd){
      console.error('ESTE POKEMÓN NO ESTA EN LOS PREDETERMINADOS');
      break;
    }

    pokemonRepository.addPokemon(pokemonAdd);

   }

   case 'average': {
      const avg = pokemonService.getAverageLevel();
      console.log(avg);
      break;
   }

   case 'fastest': {
      const fastest = pokemonService.getFastestPokemon();
      console.log(fastest);
      break;
   }

  }
}

main();