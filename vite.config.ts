import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    cors: false,
    proxy: {
      '/cnb': {
        target: 'https://www.cnb.cz',
        changeOrigin: true,
        //secure: true,
        rewrite: (path) =>
          path.replace(
            /^\/cnb/,
            '/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt',
          ),
      },
    },
  },
  plugins: [mkcert(), react()],
})
