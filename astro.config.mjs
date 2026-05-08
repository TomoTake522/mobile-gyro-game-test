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
      // 古い require('fs') などを node:fs 形式に強制変換して解決させる
      alias: {
        fs: 'node:fs',
        child_process: 'node:child_process',
        util: 'node:util',
        path: 'node:path',
        os: 'node:os',
        stream: 'node:stream',
        crypto: 'node:crypto',
      }
    },
    build: {
      rollupOptions: {
        // ビルド対象から完全に外す
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
      // サーバーサイドでのビルド時もこれらを外部モジュールとして扱う
      external: ['fs', 'child_process', 'path', 'os', 'crypto', 'stream', 'util'],
    }
  }
});