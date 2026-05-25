import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemon/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await res.json();
      return data.results.map((_: unknown, i: number) => ({ id: String(i + 1) }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
