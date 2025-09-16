import { Pokemon } from './models/Pokemon';
import { PokemonRepository } from './repositories/PokemonRepository';
import { PokemonService } from './services/PokemonService';
import { PokeAPIAdapter } from './adapters/pokeApiAdapter';


const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);
const pokeAPI = new PokeAPIAdapter();

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
   case 'add': {

    const pokemonName = args[1];
    if(!pokemonName){
      console.error('POR FAVOR INGRESA UN NOMBRE DE POKEMÓN');
      break;
    }

    try{
      const info = await pokeAPI.getPokemonInfo(pokemonName);
      
      const pokemon = new Pokemon(info.name, 100, {
        hp : info.hp,
        attack: info.attack,
        defense: info.defense,
        speed: info.speed,
      });

      pokemonRepository.addPokemon(pokemon);
      console.log("Pokemón agregado correctamente");
    }catch(error){
      console.log("Error al agregar el pokemón");
    }

    break;
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