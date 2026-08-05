import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: './' —— 相对路径，便于部署到 GitHub Pages 子路径（/<repo>/）
export default defineConfig({
  base: './',
  plugins: [react()],
})
