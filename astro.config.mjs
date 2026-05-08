import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // SSRモードを有効化
  output: 'server',
  
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    // これがNode.jsモジュールのエラーを防ぐ鍵です
    nodejsCompat: true,
  }),

  // integrations は adapter の外に置きます
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
  }
});