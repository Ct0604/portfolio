import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  base: mode === 'production' ? '/portfolio/' : '/',
  server: {
    port: 3000,
    open: true
  }
}))
