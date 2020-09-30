module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{html,css,js,json,webmanifest,ico,gif,jpg,jpeg,png,webp}'
  ],
  swDest: 'dist/sw.js',
  importWorkboxFrom: 'disabled',
  importScripts: [
    'https://cdn.jsdelivr.net/npm/workbox-sw@4.3.1/build/workbox-sw.min.js'
  ],
  clientsClaim: true,
  cleanupOutdatedCaches: true
};
