import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      "find-me-1.onrender.com",  // your deployed frontend
      "localhost",               // local dev
    ],
  }
})
