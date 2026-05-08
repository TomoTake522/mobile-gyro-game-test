import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    // 設定は wrangler.toml に任せる
    platformProxy: { enabled: true },
  }),

  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // Node.js 標準モジュールへの参照を node: プレフィックス付きに変換
        fs: 'node:fs',
        child_process: 'node:child_process',
        path: 'node:path',
        os: 'node:os',
        util: 'node:util',
        stream: 'node:stream',
        crypto: 'node:crypto',
      }
    },
    build: {
      rollupOptions: {
        // 依存関係のスキャンから完全に除外
        external: [
          'node:fs',
          'node:child_process',
          'node:path',
          'node:os',
          'node:util',
          'node:stream',
          'node:crypto',
          'detect-libc'
        ],
      }
    },
    ssr: {
      // サーバーサイド実行時もこれらの読み込みをスキップ
      external: ['detect-libc', 'fs', 'child_process', 'path', 'os', 'util', 'stream', 'crypto'],
    }
  }
});