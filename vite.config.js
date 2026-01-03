import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/capecoasts/', // Only if not using a custom domain
  plugins: [react()],
  server: {
    host: true,
  }
})
