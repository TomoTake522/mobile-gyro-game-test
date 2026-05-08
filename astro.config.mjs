import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'; // v4の場合はこちら
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // 今回は 'server' モードが必要なはずなので
  output: 'server',
  
  adapter: cloudflare({
    platformProxy: { enabled: true },
    // これが「Node.jsのフリをする」魔法のスイッチです
    nodejsCompat: true, 
  }),

  // 画像処理が紛れ込まないように封印
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },

  integrations: [], // Tailwind v4がviteプラグインなら空でOK

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // 外部Node.jsモジュールを徹底的に無視させる設定
      external: [
        'node:fs', 
        'node:child_process', 
        'node:util', 
        'node:stream', 
        'node:path', 
        'node:os', 
        'node:crypto',
        'sharp' // これを明示的に外す
      ],
    }
  }
});