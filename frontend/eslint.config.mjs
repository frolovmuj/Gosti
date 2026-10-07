import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@app/*/*',
                '@pages/*/*',
                '@widgets/*/*',
                '@features/*/*',
                '@entities/*/*',
              ],
              message: 'Импортируйте слайс только через его public API (index.ts).',
            },
          ],
        },
      ],
    },
  },
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', '.yarn/**', 'next-env.d.ts']),
]);

export default eslintConfig;
