import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import EnvironmentPlugin from 'vite-plugin-environment'


export default defineConfig({
  plugins: [react(), EnvironmentPlugin(['VITE_STRAPI_KEY', 'VITE_API_URL', 'VITE_API_IMAGE_URL']),],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@layout', replacement: path.resolve(__dirname, 'src/components/layout') },
      { find: '@partials', replacement: path.resolve(__dirname, 'src/components/partials') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
    ]
  }
})
