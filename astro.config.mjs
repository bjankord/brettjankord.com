import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://astro.build/config
export default defineConfig({
  resolve: {
      alias: {
        '$': path.resolve(__dirname, './src'),
      },
  },
	site: 'https://www.brettjankord.com',
	integrations: [image(), mdx(), sitemap()],
});
