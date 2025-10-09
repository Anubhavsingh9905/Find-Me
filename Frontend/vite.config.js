import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      "https://find-me-v4yl.onrender.com",
      "localhost",              
    ],
  }
})
