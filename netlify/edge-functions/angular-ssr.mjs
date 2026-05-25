import { netlifyAppEngineHandler } from '../../dist/pokemon-ssr/server/server.mjs';

export default netlifyAppEngineHandler;

export const config = {
  path: '/*',
  excludedPath: [
    '/.netlify/*',
    '/*.js',
    '/*.css',
    '/*.ico',
    '/*.png',
    '/*.jpg',
    '/*.svg',
    '/*.woff',
    '/*.woff2',
    '/*.map',
    '/*.txt',
    '/*.json',
    '/*.html',
  ],
};
