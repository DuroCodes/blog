import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import image from '@astrojs/image';
import addClasses from 'rehype-add-classes';
import rehypePrettyCode from 'rehype-pretty-code';
import mdx from '@astrojs/mdx';
import { HOMEPAGE_URL } from './src/config';

const require = createRequire(import.meta.url);

const theme = JSON.parse(readFileSync(require.resolve('./src/themes/moonlight.json')));

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
  site: HOMEPAGE_URL,
  integrations: [mdx({ extendPlugins: 'markdown' }), sitemap(), tailwind(), react(), image()],
  markdown: {
    extendDefaultPlugins: true,
    shikiConfig: {
      theme,
    },
    rehypePlugins: [[rehypePrettyCode, {
      theme,
      onVisitLine(node) {
        if (node.children.length === 0) {
          node.children = [{
            type: 'text',
            value: ' ',
          }];
        }
      },
      onVisitHighlightedLine(node) {
        node.properties.className.push('highlighted');
      },
      onVisitHighlightedWord(node) {
        node.properties.className = ['word'];
      },
    }], [addClasses, {
      h1: 'text-3xl font-bold',
      h2: 'text-2xl font-bold',
      h3: 'text-xl font-bold',
      h4: 'text-lg font-bold',
      h5: 'font-bold',
      h6: 'font-bold',
      img: 'border border-slate-300 dark:border-slate-700 rounded-xl mb-6',
      p: 'mb-6',
      a: 'underline underline-offset-2 hover:text-indigo-500 decoration-indigo-500',
      pre: 'rounded-md !bg-red-500',
    }]],
  },
});
