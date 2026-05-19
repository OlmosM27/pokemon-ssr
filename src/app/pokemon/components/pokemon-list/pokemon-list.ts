import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonCard } from "../pokemon-card/pokemon-card";

@Component({
  selector: 'pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonList {}
