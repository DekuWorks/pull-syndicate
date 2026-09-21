import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(root, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
