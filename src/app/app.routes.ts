import { Routes } from '@angular/router';
import { pokemonResolver } from './pokemon/resolvers/pokemon.resolver';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page'),
  },
  {
    path: 'pokemon/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemon-page'),
  },
  // {
  //   path: 'pokemon',
  //   loadComponent: () => import('./pages/pokemons/pokemon-page'),
  // },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component'),
    resolve: {
      pokemon: pokemonResolver,
    },
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page'),
  },
  {
    path: '**',
    redirectTo: 'about',
  },
];
