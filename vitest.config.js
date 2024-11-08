/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.ts',
    coverage: {
      exclude: [
        'next.config.mjs',
        'postcss.config.mjs',
        'tailwind.config.ts',
        '**/.next/**',
        'next-env.d.ts',
        'vitest.config.js',
        'src/app/vitest.d.ts',
        'src/interface/**'
      ],
      thresholds:{
        statements:80
      }
    },
  },
});
