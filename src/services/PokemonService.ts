import { PokemonRepository } from '../repositories/PokemonRepository';
import { Pokemon } from '../models/Pokemon';

export class PokemonService {

    constructor(private pokemonRepository: PokemonRepository) {}

    getAverageLevel(): number {
       const pokemonList = this.pokemonRepository.getPokemonList();
       let sum = 0;
       for(let i=0; i<pokemonList.length; i++){
            sum+= pokemonList[i].level;
       }
       return sum/pokemonList.length;
    }

    getFastestPokemon(): Pokemon | null {
        const pokemonList = this.pokemonRepository.getPokemonList();
        let fastedPokemon = pokemonList[0];
        for(let i=0; i<pokemonList.length; i++){
            if(pokemonList[i].stats.speed > fastedPokemon.stats.speed){
                fastedPokemon = pokemonList[i];
            }
        }
        return fastedPokemon;
    }
        
}