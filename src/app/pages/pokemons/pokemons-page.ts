import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonList } from "../../pokemon/components/pokemon-list/pokemon-list";

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage {}
