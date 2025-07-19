import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      hmr: false,
      proxy: {
        '/api': {
          target: 'http://localhost:3001/api',
          changeOrigin: true,
          secure: false,
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
