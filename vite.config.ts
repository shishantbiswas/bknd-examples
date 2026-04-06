import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';
import { solidStart } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    solidStart(),
    tailwindcss(),
    nitro({
      // features: {
      //   websocket: true,
      // },
      // handlers: [
      //   {
      //     route: '/api/_ws',
      //     handler: './src/websockets/_ws.ts',
      //     middleware: false, // Prevents standard HTTP middleware from interfering
      //   },
      // ],
    }),
  ],
});
