import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [react(), Pages({
    dirs: 'src/pages',
  })],
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
