import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      // Next.js reserves `app` and `pages`, so FSD layers are named `_app` and `_pages`.
      'fsd/typo-in-layer-name': 'off',
      'fsd/insignificant-slice': 'warn',
    },
  },
]);
