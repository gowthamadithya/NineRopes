import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // or 'dist' if that's your preferred output directory
    // other build options
  },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://www.reddit.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//       '/oauth': {
//         target: 'https://oauth.reddit.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/oauth/, ''),
//       },
//     },
//   },
});
