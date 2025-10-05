import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: "find-me-1.onrender.com",
    host: true,
    port: 5173,
  }
})
