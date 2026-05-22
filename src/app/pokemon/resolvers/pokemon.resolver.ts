import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Pokemon } from '../interfaces';
import { PokemonService } from '../services/pokemon.service';

export const pokemonResolver: ResolveFn<Pokemon> = (route) => {
  const pokemonService = inject(PokemonService);
  const id = route.paramMap.get('id')!;
  return pokemonService.loadPokemon(id);
};
