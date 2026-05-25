import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PokemonList } from '../../pokemon/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { SimplePokemon } from '../../pokemon/interfaces';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemon-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);

  public isLoading = signal(true);
  public pokemon = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  public loadOnPageChange = effect(() => {
    this.loadPokemon(this.currentPage());
  });

  public loadPokemon(page = 0) {
    const pageToLoad = page;
    this.isLoading.set(true);
    this.pokemonService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => this.title.setTitle(`Pokemon SSR - Page ${pageToLoad}`)),
      )
      .subscribe((pokeList) => {
        this.pokemon.set(pokeList);
        this.isLoading.set(false);
      });
  }
}
