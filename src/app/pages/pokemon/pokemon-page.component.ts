import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Pokemon } from '../../pokemon/interfaces';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const pokemon: Pokemon = this.route.snapshot.data['pokemon'];
    this.pokemon.set(pokemon);

    const { name, id } = pokemon;
    const pageTitle = `#${id} - ${name.toLocaleUpperCase()}`;
    const pageDescription = `Página del Pokemon ${name}`;
    const pageImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({ name: 'og:title', content: pageTitle });
    this.meta.updateTag({ name: 'og:description', content: pageDescription });
    this.meta.updateTag({ name: 'og:image', content: pageImage });
  }
}
