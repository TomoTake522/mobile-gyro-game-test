import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  
  adapter: cloudflare({
    platformProxy: { enabled: true },
    nodejsCompat: true, 
  }),

  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // ここが重要！ fs や child_process を呼ぼうとしたら「空っぽ」に置き換える
      alias: {
        'fs': 'node:fs',
        'child_process': 'node:child_process',
        'detect-libc': 'node:process', // エラー源の detect-libc を実質無効化
      }
    },
    build: {
      rollupOptions: {
        external: [
          'node:fs',
          'node:child_process',
          'node:util',
          'node:path',
          'node:os',
          'node:stream',
          'node:crypto',
          'sharp'
        ],
      }
    },
    ssr: {
      // node: プリフィックスなしの古い呼び出しを外部扱いにして無視させる
      external: ['fs', 'child_process', 'path', 'os', 'crypto', 'stream', 'util'],
      noExternal: ['tailwindcss'],
    }
  }
});