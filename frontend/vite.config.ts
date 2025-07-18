import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3001', 
        changeOrigin: true,
        configure: () => {
          // print for debugging purpose - need proxy as parameter
          // proxy.on('proxyReq', (proxyReq, req) => {
          //   const targetHost = proxyReq.getHeader('host');
          //   const fullUrl = `${proxyReq.protocol || 'http:'}//${targetHost}${proxyReq.path}`;
          //   console.log(`[VITE PROXY] ${req.method} ${req.url} → ${fullUrl}`);
          // });
        },
      }
    },
  },
});
