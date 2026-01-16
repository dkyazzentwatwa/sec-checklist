import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    headers: {
      // Required for SharedArrayBuffer and WebGPU
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  preview: {
    headers: {
      // Required for SharedArrayBuffer and WebGPU
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Rights Shield - Activist Resource Platform',
        short_name: 'Rights Shield',
        description: 'Privacy-first activist resource platform for immigration rights, digital security, and community defense',
        theme_color: '#1F2937',
        background_color: '#111827',
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        categories: ['education', 'utilities', 'social'],
        lang: 'en-US',
        dir: 'ltr',
        shortcuts: [
          {
            name: 'Emergency Hotlines',
            url: '/immigration/emergency',
            icons: [{ src: '/shortcuts/emergency.png', sizes: '96x96' }]
          },
          {
            name: 'AI Assistant',
            url: '/ai',
            icons: [{ src: '/shortcuts/ai.png', sizes: '96x96' }]
          }
        ]
      },
      workbox: {
        // Allow larger files (AI libraries are big)
        maximumFileSizeToCacheInBytes: 25 * 1024 * 1024, // 25MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react'],
          'db-vendor': ['dexie', 'dexie-react-hooks'],
          'i18n-vendor': ['i18next', 'react-i18next'],
          'query-vendor': ['@tanstack/react-query'],
          'state-vendor': ['zustand'],
          // AI libraries in separate chunks (loaded on demand)
          'ai-webllm': ['@mlc-ai/web-llm'],
          'ai-transformers': ['@xenova/transformers']
        }
      }
    },
    chunkSizeWarningLimit: 3000 // AI libraries are large
  },
  optimizeDeps: {
    exclude: ['@mlc-ai/web-llm', '@xenova/transformers', 'onnxruntime-web']
  }
})
