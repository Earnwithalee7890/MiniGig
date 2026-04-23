import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration optimized for Celo MiniPay and Talent Protocol
// Ensure host is true for mobile testing
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: ["bullous-kandis-tardiest.ngrok-free.dev"],
    host: true,
  }
})
