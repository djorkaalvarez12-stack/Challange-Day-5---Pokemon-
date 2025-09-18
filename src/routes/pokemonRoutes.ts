import { Router, Request, Response } from "express";
import { PokeAPIAdapter } from "../adapters/pokeApiAdapter";
import { PokemonRepository } from "../repositories/PokemonRepository";
import { Pokemon } from "../models/Pokemon";

export const pokemonRouter = Router();
const pokeAPI = new PokeAPIAdapter();
const pokemonRepository = new PokemonRepository();

pokemonRouter.get("/add-pokemon/:name",async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const PokemonInfo = await pokeAPI.getPokemonInfo(name);

    const newPokemon = new Pokemon(PokemonInfo.name, 100, {
        hp: PokemonInfo.hp,
        attack: PokemonInfo.attack,
        defense: PokemonInfo.defense,
        speed: PokemonInfo.speed,
    });

    pokemonRepository.addPokemon(newPokemon);

    return res.status(201).json({ message: `Pokemon added successfully` });

  } catch (error: any) {
    return res.status(500).json({ message: `Pokemon not added` });
  }
  
});

pokemonRouter.get("/average", (req: Request, res: Response) => {
  const pokemons = pokemonRepository.getPokemonList();

  const totalLevel = pokemons.reduce((sum, pokemon) => sum + pokemon.level, 0);
  const avgLevel = totalLevel / pokemons.length;

  return res.json({ averageLevel: avgLevel });
});

pokemonRouter.get("/fastest", (req: Request, res: Response) => {
 const pokemons = pokemonRepository.getPokemonList();

 let fastest = pokemons[0];
for (let i = 1; i < pokemons.length; i++) {
    if (pokemons[i].stats.speed > fastest.stats.speed) {
      fastest = pokemons[i];
    }
}

  return res.json({ fastestPokemon: fastest });
});