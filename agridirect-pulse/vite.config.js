import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/localhost:8080\/api\/prices/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'prices-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxAgeSeconds: 1800,
              },
            },
          },
          {
            urlPattern: /^https:\/\/localhost:8080\/api\/listings/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'listings-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
      manifest: {
        name: 'AgriDirect Pulse',
        short_name: 'AgriDirect',
        description: 'Direct agricultural marketplace connecting farmers with fair prices',
        theme_color: '#1B5E20',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-192x192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: '/screenshot1.png',
            sizes: '540x720',
            form_factor: 'narrow',
          },
          {
            src: '/screenshot2.png',
            sizes: '1280x720',
            form_factor: 'wide',
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react')) {
            return 'react-vendors';
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'routing';
          }
          if (id.includes('node_modules/react-query')) {
            return 'query';
          }
        },
      },
    },
  },
})
