import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    /**
     * GitHub Pages Base Path:
     * When running locally ('serve'), base is '/' for easy browser testing.
     * When building for production ('build'), base is set to the GitHub repository name:
     * '/simple-jwt-authentication-react/'
     * 
     * NOTE: If your GitHub repository has a different name, change this value
     * or set the VITE_BASE_PATH environment variable.
     */
    base: command === 'serve'
      ? '/'
      : (process.env.VITE_BASE_PATH || '/simple-jwt-authentication-react/'),
  };
});
