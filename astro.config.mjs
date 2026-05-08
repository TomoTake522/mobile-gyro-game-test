import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    // wrangler.toml を使う場合はここを調整
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
        // 全ての Node.js モジュール呼び出しを node: 付きへ強制リダイレクト
        fs: 'node:fs',
        child_process: 'node:child_process',
        path: 'node:path',
        os: 'node:os',
        util: 'node:util',
        stream: 'node:stream',
        crypto: 'node:crypto',
      }
    },
    ssr: {
      // 問題のライブラリを絶対にバンドルに含めない
      external: ['detect-libc', 'sharp', 'fs', 'child_process'],
    }
  }
});