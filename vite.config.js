import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = isGitHubActions && repositoryName ? `/${repositoryName}/` : '/'

// Keep Vercel/local on root, but serve from the repo path on GitHub Pages.
export default defineConfig({
  base,
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
})
