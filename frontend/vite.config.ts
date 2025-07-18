import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = env.VITE_API_URL || 'http://localhost:3001/api';

  return {
    plugins: [react()],
    server: {
      hmr: false,
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: () => {
            // print for debugging purpose - need proxy as parameter
            // proxy.on('proxyReq', (proxyReq, req) => {
            //   const targetHost = proxyReq.getHeader('host');
            //   const fullUrl = `${proxyReq.protocol}//${targetHost}${proxyReq.path}`;
            //   console.log(`[VITE PROXY] ${req.method} ${req.url} → ${fullUrl}`);
            // });
          },
        }
      },
    },
  };
});
