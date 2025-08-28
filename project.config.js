/**
 * Shellaquiles.org Project Configuration
 * Configuración del proyecto para build y despliegue
 */

module.exports = {
  // Project Information
  project: {
    name: 'shellaquiles.org',
    version: '1.0.0',
    description: 'Comunidad de Comunidades - Landing page con estilo terminal',
    author: 'Shellaquiles Community',
    license: 'MIT'
  },

  // Build Configuration
  build: {
    sourceDir: 'src',
    outputDir: 'dist',
    assetsDir: 'assets',
    cleanBeforeBuild: true,
    minify: {
      css: true,
      js: true,
      html: true
    }
  },

  // Development Server
  dev: {
    port: 8000,
    host: 'localhost',
    open: true,
    liveReload: true
  },

  // File Paths
  paths: {
    html: 'index.html',
    css: 'src/css/styles.css',
    js: 'src/js/script.js',
    images: 'src/images',
    docs: 'docs',
    dist: 'dist'
  },

  // Browser Support
  browsers: [
    '> 1%',
    'last 2 versions',
    'not dead'
  ],

  // Features
  features: {
    terminal: true,
    responsive: true,
    animations: true,
    accessibility: true
  }
};
