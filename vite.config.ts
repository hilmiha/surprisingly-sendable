import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/surprisingly-sendable/",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '/src/styles/variables.scss' as *;`
      }
    }
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
})
