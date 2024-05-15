import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import Pages from 'vite-plugin-pages'
import EnvironmentPlugin from 'vite-plugin-environment'

import process from 'process'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/microbamba' : '/',
  plugins: [react(), Pages({
    dirs: 'src/pages',
  }), EnvironmentPlugin(['STRAPI_KEY', 'API_URL', 'API_IMAGE_URL']),],
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
