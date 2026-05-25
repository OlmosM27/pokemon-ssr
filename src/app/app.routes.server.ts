import { RenderMode, ServerRoute } from '@angular/ssr';

const ITEMS_PER_PAGE = 12;
const TOTAL_POKEMON = 151;

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemon/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`);
      const data = await res.json();
      return data.results.map((p: { name: string }, i: number) => ({ id: String(i + 1) }));
    },
  },
  {
    path: 'pokemon/page/:page',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const totalPages = Math.ceil(TOTAL_POKEMON / ITEMS_PER_PAGE);
      return Array.from({ length: totalPages }, (_, i) => ({
        page: String(i + 1),
      }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
