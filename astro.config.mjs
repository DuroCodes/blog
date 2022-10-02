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
      h1: 'text-3xl font-bold underline underline-offset-2 decoration-indigo-500 mt-4 mb-4 font-poppins',
      h2: 'text-2xl font-bold font-poppins',
      h3: 'text-xl font-bold font-poppins',
      h4: 'text-lg font-bold font-poppins',
      h5: 'font-bold',
      h6: 'font-bold',
      img: 'border border-slate-300 dark:border-slate-700 rounded-xl mb-6',
      p: 'mb-4',
      a: 'underline underline-offset-2 hover:text-indigo-500 decoration-indigo-500',
      pre: 'rounded-md',
      code: 'border border-slate-300 dark:border-slate-700 bg-slate-800 text-slate-300 rounded-md px-0.5',
    }]],
  },
});
