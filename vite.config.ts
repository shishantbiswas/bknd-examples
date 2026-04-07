import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';
import { solidStart } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    solidStart({
      middleware: "./src/middleware/index.ts"
    }),
    tailwindcss(),
    nitro({
      // features: {
      //   websocket: true,
      // },
      // handlers: [
      //   {
      //     route: '/api/_ws',
      //     handler: './ws.ts',
      //     middleware: false,
      //   },
      // ],
    }),
  ],
});
