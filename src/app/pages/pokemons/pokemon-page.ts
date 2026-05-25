import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PokemonList } from '../../pokemon/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { SimplePokemon } from '../../pokemon/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemon-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage implements OnInit {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  private platformId = inject(PLATFORM_ID);

  public isLoading = signal(true);
  public pokemon = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  ngOnInit(): void {
    this.loadPokemon();
  }

  public loadPokemon(page = 0) {
    const pageToLoad = this.currentPage()! + page;
    this.isLoading.set(true);
    this.pokemonService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => {
          if (isPlatformBrowser(this.platformId)) {
            this.router.navigate([], { queryParams: { page: pageToLoad } });
          }
        }),
        tap(() => this.title.setTitle(`Pokemon SSR - Page ${pageToLoad}`)),
      )
      .subscribe((pokeList) => {
        this.pokemon.set(pokeList);
        this.isLoading.set(false);
      });
  }
}
