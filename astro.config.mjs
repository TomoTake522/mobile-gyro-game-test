import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // SSRモードを有効化
  output: 'server',
  adapter: cloudflare(),

  // ルール通り明示的に空配列を指定
  integrations: [],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // Cloudflare SSRでのCSS解決エラーを防ぐための設定
      noExternal: ['tailwindcss'],
    },
    build: {
      // CSSのパス解決を安定させるための設定
      cssCodeSplit: true,
    }
  },
});