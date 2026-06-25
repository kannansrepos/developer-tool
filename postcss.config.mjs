import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/**
 * PostCSS configuration for the project.
 * Uses TailwindCSS and Autoprefixer plugins.
 */
export default {
  plugins: [
    tailwindcss(),
    autoprefixer()
  ]
};